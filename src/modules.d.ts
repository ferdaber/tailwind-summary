declare module 'tailwindcss' {
  import { AcceptedPlugin } from 'postcss'
  export default function tailwind(config: any): AcceptedPlugin
}
