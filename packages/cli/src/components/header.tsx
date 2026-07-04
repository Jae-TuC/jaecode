export const Header = () => {
    return (
        <box alignItems="center" justifyContent="center" flexGrow={1}>
            <box flexDirection="row" justifyContent="center" alignItems="flex-end" gap={0.5}>
                <ascii-font font="tiny" text="Jae" color="gray" />
                <ascii-font font="tiny" text="Code" />
            </box>
        </box>
    )
}