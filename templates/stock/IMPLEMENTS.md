# IMPLEMENTS.md

## Objetivo
Este documento descreve, ponta a ponta, como integrar autenticação e reautenticação no front-end usando `@ti_torra/auth`, no mesmo padrão usado neste projeto.

## Visão Geral do Fluxo
1. O `AuthManager` é configurado em modo `sso` com endpoints de login, usuário autenticado e refresh.
2. O `AuthProvider` restaura sessão ao iniciar a aplicação e injeta o token no `axios`.
3. O `Initializer` (com `useEffect`) lê `?sso=` da URL e faz `signIn` automaticamente.
4. Quando o token expira, o `onExpired` abre um modal de reautenticação.
5. A reautenticação chama `refresh-token`, atualiza sessão/token e recarrega a aplicação.

---

## 1) Dependência
No `package.json`:

```json
"@ti_torra/auth": "^1.0.11"
```

---

## 2) Criar o AuthManager
Arquivo de referência: `src/managers/auth.manager.tsx`

Pontos obrigatórios:
- `mode: 'sso'`
- `storage: new WebStorageAdapter()` para persistência de sessão no browser
- `httpClient` apontando para seu client HTTP (`axios`)
- `endpoints` com:
  - `sso`: endpoint que recebe o SSO
  - `authenticatedUser`: endpoint de usuário autenticado
  - `refresh`: endpoint de refresh token
- `sessionMapper`: converte payload bruto da API para sessão usada no front
- `refreshBodyMapper`: monta body da reautenticação
- `refreshMerger`: mescla nova credencial na sessão atual

Exemplo (resumo do padrão atual):

```ts
export const authManager = new AuthManager<'sso', SsoRaw>({
  storage: new WebStorageAdapter(),
  httpClient: api,
  mode: 'sso',
  endpoints: {
    sso: '/Auth/v1/Autenticacao/authenticate',
    authenticatedUser: '/Admin/v1/Usuario/Autenticado',
    refresh: '/Auth/v1/Autenticacao/refresh-token',
  },
  sessionMapper: (data) => ({
    accessToken: data.autenticacao.accessToken,
    refreshToken: data.autenticacao.refreshToken,
    login: data.usuario.login,
    user: data.usuario,
    empresas: data.usuario.empresas,
    empresaSelecionada: data.usuario.empresas?.[0] ?? null,
    filiais: [],
    expiresAt: data.usuario?.expiraEm
      ? new Date(data.usuario.expiraEm).getTime()
      : Date.now() + (data.autenticacao?.expiresIn ?? 3600) * 1000,
  }),
  refreshBodyMapper: (s) => ({
    login: s.login,
    refreshToken: s.refreshToken,
    codigoCliente: s.empresaSelecionada?.codigoCliente,
    codigoEmpresa: s.empresaSelecionada?.codigoEmpresa,
    codigoSistema: SYSTEM_CODE,
  }),
  refreshMerger: (current, raw) => ({
    ...current,
    accessToken: raw.accessToken,
    refreshToken: raw.refreshToken,
    expiresAt: raw.expiraEm
      ? new Date(raw.expiraEm).getTime()
      : Date.now() + (raw.expiresIn ?? 3600) * 1000,
  }),
});
```

### Hooks pós-autenticação (`onPostAuth`)
Use para acoplar ações do sistema após login/refresh:
- Injetar `Authorization` no client HTTP
- Buscar dados complementares (ex.: filiais, menu)
- Escrever cookie de token, se seu projeto exigir

No padrão atual:
- Atualiza `api.defaults.headers.Authorization`
- Carrega filiais do usuário
- Carrega sidebar
- Grava cookie `Auth.Token`

---

## 3) Criar o AuthProvider
Arquivo de referência: `src/context/auth.context.tsx`

Objetivo:
- Restaurar sessão ao montar a app
- Setar/remover `Authorization` no `axios`
- Só renderizar aplicação quando estiver pronto (`ready`)

Fluxo:
1. `useEffect` chama `authManager.restoreSession()`.
2. Se existir `session.accessToken`, configura header bearer.
3. Se não existir sessão, remove header.
4. Renderiza `<Provider manager={authManager}>`.

Esse passo evita tela renderizar sem estado de autenticação definido.

---

## 4) Implementar o Initializer (SSO no useEffect)
Arquivo de referência: `src/components/Initializer/index.tsx`

Este é o ponto mais importante para login automático com SSO vindo na URL.

### Comportamento esperado
- Ler `sso` da query string via `useSearchParams()`.
- Se não houver `sso`, não faz nada.
- Se já existe sessão ativa, apenas limpa `sso` da URL.
- Se não existe sessão, chama `manager.signIn({ sso })`.
- Em `finally`, remover `sso` da URL para não repetir autenticação.

Exemplo:

```tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@ti_torra/auth';

export function Initializer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { manager } = useAuth();

  useEffect(() => {
    const sso = searchParams.get('sso');

    if (!sso) return;

    if (manager.getSession()) {
      const url = new URL(window.location.href);
      url.searchParams.delete('sso');
      router.replace(url.pathname);
      return;
    }

    (async () => {
      try {
        await manager.signIn({ sso });
      } finally {
        const url = new URL(window.location.href);
        url.searchParams.delete('sso');
        router.replace(url.pathname);
      }
    })();
  }, [searchParams, router, manager]);

  return null;
}
```

### Onde montar o Initializer
No layout principal autenticado, dentro do `AuthProvider`:

```tsx
<AuthProvider>
  <Initializer />
  {/* demais providers e layout */}
</AuthProvider>
```

Referência atual: `src/app/(pages)/layout.tsx`.

---

## 5) Reautenticação (token expirado)
Arquivo de referência: `src/context/reauth.context.tsx`

### Estratégia
- Registrar `authManager.onExpired(...)` uma única vez.
- Quando expirar:
  - guardar `actions` recebidas (`reauthenticate` e `logout`)
  - abrir modal para o usuário decidir

### Fluxo de confirmar reautenticação
1. Usuário clica em `Reautenticar`.
2. Executa `actions.reauthenticate()` (ou fallback `authManager.reauthenticate()`).
3. Lê sessão atualizada (`authManager.getSession()`).
4. Atualiza `api.defaults.headers.common.Authorization`.
5. Fecha modal.
6. Recarrega a página (`window.location.reload()`) para garantir estado limpo.

### Fluxo de sair
1. Usuário clica em `Sair`.
2. Executa `actions.logout()` (ou fallback `authManager.logout()`).
3. Fecha modal.
4. Navega para `/logout`.

---

## 6) Ordem recomendada de Providers
Referência atual: `src/app/(pages)/layout.tsx`

Ordem mínima:
1. `AuthProvider`
2. `Initializer`
3. `ReauthProvider`
4. Demais providers da aplicação

Isso garante:
- sessão restaurada antes dos componentes protegidos
- SSO processado cedo
- modal de reauth disponível para toda a área autenticada

---

## 7) Checklist de implementação
- `@ti_torra/auth` instalado
- `authManager` criado com `mode: 'sso'`
- endpoints de `sso`, `authenticatedUser` e `refresh` configurados
- `sessionMapper`, `refreshBodyMapper` e `refreshMerger` implementados
- `AuthProvider` chamando `restoreSession()` no `useEffect`
- header bearer atualizado/removido no `axios`
- `Initializer` lendo `sso` no `useEffect` e chamando `signIn`
- `sso` removido da URL após autenticação
- `ReauthProvider` registrando `onExpired`
- modal de reautenticação com ações `Reautenticar` e `Sair`
- pós-reauth atualizando header bearer

---

## 8) Erros comuns e como evitar
- Não remover `sso` da URL: causa tentativas repetidas de login.
- Não chamar `restoreSession()` no startup: app inicia “deslogada” mesmo com sessão persistida.
- Não atualizar header bearer após refresh: chamadas seguintes falham com 401.
- Registrar `onExpired` várias vezes: pode abrir múltiplos modais.
- Reauth sem fallback: em cenários de ações expiradas indefinidas, fluxo quebra.

---

## 9) Referências do projeto
- `src/managers/auth.manager.tsx`
- `src/context/auth.context.tsx`
- `src/components/Initializer/index.tsx`
- `src/context/reauth.context.tsx`
- `src/app/(pages)/layout.tsx`
- `src/services/api.ts`
