import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="shadow-sm">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 hover:opacity-80 transition-opacity"
            color="foreground"
            href="/"
          >
            {/* <Logo /> */}
            <p className="font-bold text-xl text-foreground">Felipe Alves</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-8 justify-center items-center flex-grow">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-6 items-center">
          <Link isExternal href={siteConfig.links.InstagramIcon} title="Instagram">
            <InstagramIcon
              className="text-default-500 hover:text-[#E1306C] transition-colors"
              size={24}
            />
          </Link>
          <Link isExternal href={siteConfig.links.LinkedInIcon} title="LinkedIn">
            <LinkedInIcon
              className="text-default-400 hover:text-[#0A66C2] transition-colors"
              size={24}
            />
          </Link>
          <Link isExternal href={siteConfig.links.GithubIcon} title="GitHub">
            <GithubIcon
              className="text-default-400 hover:text-black dark:hover:text-white transition-colors"
              size={24}
            />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="flex gap-4 items-center">
          <Link isExternal href={siteConfig.links.GithubIcon} title="GitHub">
            <GithubIcon
              className="text-default-500 hover:text-black dark:hover:text-white transition-colors"
              size={24}
            />
          </Link>
          <ThemeSwitch />
          <div className="">
            <NavbarMenuToggle className="text-default-500 hover:text-primary transition-colors text-2xl p-3 rounded-lg" />
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-20 flex flex-col gap-6 items-center">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          <div className="flex gap-6 mt-4">
            <Link isExternal href={siteConfig.links.InstagramIcon} title="Instagram">
              <InstagramIcon
                className="text-default-500 hover:text-[#E1306C] transition-colors"
                size={24}
              />
            </Link>
            <Link isExternal href={siteConfig.links.LinkedInIcon} title="LinkedIn">
              <LinkedInIcon
                className="text-default-500 hover:text-[#0A66C2] transition-colors"
                size={24}
              />
            </Link>
            <Link isExternal href={siteConfig.links.GithubIcon} title="GitHub">
              <GithubIcon
                className="text-default-500 hover:text-black dark:hover:text-white transition-colors"
                size={24}
              />
            </Link>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};