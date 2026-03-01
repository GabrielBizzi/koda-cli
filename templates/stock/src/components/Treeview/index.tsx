/* eslint-disable react/no-children-prop */
import { Admin } from '@/_types/Access';
import { css, cx } from '@emotion/css';
import {
	CheckBox,
	CheckBoxOutlineBlank,
	IndeterminateCheckBox,
} from '@mui/icons-material';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { GridProps, IconButton } from '@mui/material';
import { Switch } from '@ti_torra/web';
import React from 'react';
import {
	alterKey,
	check,
	isCheckedMenu,
	isCheckedNode,
	isCheckedSystem,
} from './utils';

type TreeviewProps<T> = {
	data: T[];
	readOnly?: boolean;
	onCheck: React.Dispatch<
		React.SetStateAction<Admin.Access.Accesses[] | undefined>
	>;
};

const Container = ({
	children,
	content,
	lvl,
	checked,
	onCheck,
	key,
	edit,
	exportPermission,
	readOnly,
	integrate,
	enableEdit,
}: {
	content: string;
	lvl: number;
	checked?: '1' | '2';
	onCheck?: () => void;
	key: string;
	children?: React.ReactNode;
	edit?: boolean;
	exportPermission?: boolean;
	readOnly?: boolean;
	integrate?: boolean;
	enableEdit?: (key: 'editar' | 'exportar' | 'integrar') => void;
} & GridProps) => {
	const [expanded, setExpanded] = React.useState<boolean>(false);
	// console.log({ content, checked, children, expanded });
	return (
		<>
			<div
				className={css`
					display: flex;
					align-items: center;
					box-sizing: border-box;
					margin-left: ${lvl * 24}px;
					gap: 8px;
				`}
			>
				<div
					className={css`
						width: 32px;
						display: flex;
						justify-content: center;
					`}
				>
					{children ? (
						<IconButton
							color="primary"
							size="small"
							onClick={() => setExpanded((prev) => !prev)}
						>
							{expanded ? <Remove /> : <Add />}
						</IconButton>
					) : null}
				</div>
				<div
					className={css`
						flex: 1;
						background-color: var(--color-neutral-01);
						padding: 16px;
						display: flex;
						align-items: center;
						border: 1px solid var(--color-neutral-02);
						border-radius: 5px;
						gap: 10px;
					`}
				>
					<label
						className={cx(
							'font_text_lg text_color_neutral_05',
							css`
								display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: center;
								gap: 16px;
								width: 100%;
							`,
						)}
						htmlFor={key as string}
					>
						{lvl !== 0 && (
							<>
								<input
									type="checkbox"
									disabled={readOnly}
									onChange={() => {
										if (onCheck) {
											onCheck();
											if (!checked) setExpanded(true);
										}
									}}
									checked={!!checked}
									id={key as string}
									className={css`
										display: none;
									`}
								/>
								<span
									className={css`
										display: flex;
										justify-content: center;
										align-items: center;
									`}
								>
									{checked == '2' ? (
										<CheckBox color="primary" />
									) : checked == '1' ? (
										<IndeterminateCheckBox color="primary" />
									) : (
										<CheckBoxOutlineBlank
											className={css`
												fill: var(
													--color-neutral-03
												) !important;
											`}
										/>
									)}
								</span>
							</>
						)}
						<div
							className={css`
								display: flex;
								justify-content: space-between;
								align-items: space-between;
								width: 100%;
								color: var(--color-neutral-05);
							`}
						>
							<span>{content}</span>
							{enableEdit && (
								<span
									className={css`
										display: flex;
										gap: 24px;
									`}
								>
									<span
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px',
										}}
									>
										<Switch
											disabled={readOnly}
											checked={edit}
											onChange={() =>
												enableEdit('editar')
											}
											key={`${key}_edit_controller`}
											color="secondary"
										/>
										<label
											htmlFor={`${key}_edit_controller`}
											className={css`
												font-family: var(
													--font-sofia-pro
												) !important;
												font-size: 14px;
												font-style: normal;
												font-weight: 400;
												line-height: 16px;
											`}
										>
											Editar
										</label>
									</span>
									<span
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px',
										}}
									>
										<Switch
											disabled={readOnly}
											checked={exportPermission}
											color="secondary"
											onChange={() =>
												enableEdit('exportar')
											}
											key={`${key}_export_controller`}
										/>
										<label
											htmlFor={`${key}_export_controller`}
											className={css`
												font-family: var(
													--font-sofia-pro
												) !important;
												font-size: 14px;
												font-style: normal;
												font-weight: 400;
												line-height: 16px;
											`}
										>
											Exportar
										</label>
									</span>
									<span
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px',
										}}
									>
										<Switch
											disabled={readOnly}
											color="secondary"
											checked={integrate}
											onChange={() =>
												enableEdit('integrar')
											}
											key={`${key}_integrate_controller`}
										/>
										<label
											htmlFor={`${key}_integrate_controller`}
											className={css`
												font-family: var(
													--font-sofia-pro
												) !important;
												font-size: 14px;
												font-style: normal;
												font-weight: 400;
												line-height: 16px;
											`}
										>
											Integrar
										</label>
									</span>
								</span>
							)}
						</div>
					</label>
				</div>
			</div>
			{children && expanded && <>{children}</>}
		</>
	);
};

export function Treeview({
	data,
	onCheck,
	readOnly,
}: TreeviewProps<Admin.Access.Accesses>) {
	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;
				gap: 12px;
			`}
		>
			{data.map((node, idx) => (
				<Container
					key={`node_${node.tag}`}
					content={node.tag}
					readOnly={readOnly}
					lvl={0}
					checked={isCheckedNode(node)}
					// eslint-disable-next-line react/no-children-prop
				>
					<>
						{node.sistemas.map((sistema) => (
							<Container
								key={`node_system_${sistema.codigoSistema}`}
								content={
									sistema.linguagens
										? sistema.linguagens[0].descricao
										: ''
								}
								lvl={1}
								readOnly={readOnly}
								checked={isCheckedSystem(sistema)}
								onCheck={() =>
									onCheck(
										check(data, [
											idx,
											sistema.codigoSistema,
										]),
									)
								}
								children={
									sistema.menus ? (
										<>
											{sistema.menus &&
												sistema.menus.map((menu) => (
													<Container
														key={`system_menu_${menu.codigoMenu}`}
														// aria-description={`system_menu_${menu.codigoMenu}`}
														content={
															menu.linguagens
																? menu
																		.linguagens[0]
																		.descricao
																: ('' as any)
														}
														lvl={2}
														readOnly={readOnly}
														checked={isCheckedMenu(
															menu,
														)}
														onCheck={() =>
															onCheck(
																check(data, [
																	idx,
																	sistema.codigoSistema,
																	menu.codigoMenu,
																]),
															)
														}
														children={
															menu.submenus ? (
																<>
																	{menu.submenus &&
																		menu.submenus.map(
																			(
																				submenu,
																			) => (
																				<Container
																					key={`menu_submenu_${submenu.codigoMenu}`}
																					content={
																						submenu.linguagens
																							? submenu
																									.linguagens[0]
																									.descricao
																							: ''
																					}
																					lvl={
																						3
																					}
																					readOnly={
																						readOnly
																					}
																					checked={isCheckedMenu(
																						submenu,
																					)}
																					enableEdit={(
																						key:
																							| 'editar'
																							| 'exportar'
																							| 'integrar',
																					) =>
																						onCheck(
																							alterKey(
																								data,
																								key,
																								[
																									idx,
																									sistema.codigoSistema,
																									menu.codigoMenu,
																									submenu.codigoMenu,
																								],
																							),
																						)
																					}
																					edit={
																						submenu.editar
																					}
																					exportPermission={
																						submenu.exportar
																					}
																					integrate={
																						submenu.integrar
																					}
																					onCheck={() =>
																						onCheck(
																							check(
																								data,
																								[
																									idx,
																									sistema.codigoSistema,
																									menu.codigoMenu,
																									submenu.codigoMenu,
																								],
																							),
																						)
																					}
																				/>
																			),
																		)}
																</>
															) : null
														}
													/>
												))}
										</>
									) : null
								}
							/>
						))}
					</>
				</Container>
			))}
		</div>
	);
}
