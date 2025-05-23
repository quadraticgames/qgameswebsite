import {
  Twitter,
  Github,
  Linkedin,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = typeof LucideIcon;

export const Icons = {
  twitter: Twitter,
  gitHub: Github,
  linkedin: Linkedin,
};

export function UnityLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 263"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      <path d="M166.872 131.237l45.91-79.275 22.184 79.275-22.185 79.256-45.909-79.256zm-22.376 12.874l45.916 79.262-79.966-20.486-57.77-58.776h91.82zm45.906-105.033l-45.906 79.275h-91.82l57.77-58.78 79.956-20.495zm65.539 65.18L227.933.06l-104.54 27.925-15.475 26.776H56.404L.001 131.244l56.403 76.49h51.524l15.474 26.784 104.54 27.92 28.007-104.55-15.475-26.786 15.475-26.784-27.935-104.531z" />
    </svg>
  );
}

export function UnrealLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256zm-32.3-151.4c-19.4 2.1-37-3.5-45.4-7.4-2.4-1.7-4.7-4-4.7-8.2 0-3.9 2.8-7.3 6.6-7.3 1.2 0 2.4.3 3.4.9 10.5 5.1 24.4 8.7 39.9 6.7 17.8-2.4 30.4-18.2 29.3-32.7-1-14.1-12.3-22.8-29.7-27.2-25.4-6.4-55.2-14.1-59-47.4-3.2-27.8 12.8-54.5 38.6-64.5 16.2-6.4 33.2-6.5 48.8-4.2 13.2 2 24.1 5.5 31.8 8.6 3.1 1.2 5.2 4.2 5.2 7.5 0 4.4-3.6 8-8 8-1.2 0-2.3-.2-3.4-.7-15.1-6.2-32.5-9.3-47.7-7.2-15.7 2.2-26.7 16.1-25.7 28.6.9 11 11.6 18.8 33.5 24.5 23.6 6.1 51.1 16.1 55 49.2 3.5 29.1-13.1 56.7-39.1 67.8z" />
    </svg>
  );
}
