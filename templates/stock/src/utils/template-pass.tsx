import { UserSchemaResponse } from '@/screens/Admin/User/types.zod';

export const sendPass = ({ nome }: UserSchemaResponse) => {
	return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
    <h3 style="color: #111;">Olá, ${nome}.</h3>
    
                <p>Bem vindo ao Portal Torra! Acesse o portal através do link <a href="https://portal.torratorra.com.br:5704/login" style="text-decoration: none;">Lojas Torra</a> com seu usuário.</p>
                <br />
    <h2 style="color: #111;">Sua senha de acesso é:</h2>
			<h1 style="color: #ff5101; font-size: 36px; font-weight: bold; margin-top: 0;">
				Torra@123
			</h1>
    <br />
			<p style="font-weight: bold;">
				Recomendamos que você altere a senha após o primeiro login.
			</p>

			<p>
				Abraços,
				<br />
				Equipe Torra
			</p>

			<hr style="margin: 30px 0;" />

			<small style="color: #555;">
				Este e-mail foi enviado automaticamente e não recebe respostas.
				<br />
				<br />
			</small>
		</div>`;
};
