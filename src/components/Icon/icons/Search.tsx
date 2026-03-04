import type { SVGRProps } from '../types'

const Search = ({ title, ...props }: SVGRProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    {title && <title>{title}</title>}
    <path
      fillRule="evenodd"
      d="M15 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l4.79 4.79-1.06 1.06z"
      clipRule="evenodd"
    ></path>
  </svg>
)

export default Search
