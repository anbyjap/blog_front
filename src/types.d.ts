// SVG のインポートのための型定義
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react'
  const content: React.FC<SVGProps<SVGSVGElement>>
  export default content
}
