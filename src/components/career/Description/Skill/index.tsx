import IconButton from "../../IconButton"

export default function Skill() {
  return (
    <div className="flex flex-col gap-2.5 w-4/5">
      <h3 className="text-gray100 font-semibold">기술 스택</h3>
      <div className="flex flex-wrap gap-2.5 w-full font-light">
        <IconButton src="/images/icon/react.png" text="React" />
        <IconButton src="/images/icon/react.png" text="React Native" />
        <IconButton src="/images/icon/ts.png" text="TypeScript" />
        <IconButton src="/images/icon/recoil.png" text="Recoil" />
        <IconButton src="/images/icon/react-query.png" text="React query" />
        <IconButton src="/images/icon/tailwind.png" text="Tailwind CSS" />
        <IconButton src="/images/icon/tailwind.png" text="nativewind" />
        <IconButton src="/images/icon/tailwind.png" text="nativewind" />
        <IconButton src="/images/icon/styled-components.png" text="Styled Components" />
        <IconButton src="/images/icon/electron.png" text="Electron" />
        <IconButton src="/images/icon/node.png" text="Node.js" />
        <IconButton src="/images/icon/mariadb.png" text="MariaDB" />
        <IconButton src="/images/icon/mysql.png" text="HeidiSQL" />
      </div>
    </div>
  )
}
