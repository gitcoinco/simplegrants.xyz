import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";
import { LoadingGrid } from "~/components/loading-grid";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { GrantCard } from "./grants/_components/grant-card";
import { DiscoverGrants } from "./grants/_components/discover-grants";

export default async function LandingPage() {
  return (
    <main>
      <div className="mx-auto flex items-center py-16">
        <div>
          <h1 className="mb-8 text-pretty font-heading text-5xl font-bold leading-snug md:text-6xl">
            Simple Grants allows you to harness the power of Quadratic Funding
            to{" "}
            <span className="text-purple-400">
              fund what matters in your community.
            </span>
          </h1>
          <Button
            as={Link}
            href={"/about"}
            size="xl"
            variant="secondary"
            className="font-heading"
          >
            Learn more about quadratic funding
          </Button>
        </div>
        <div className="hidden md:block">
          <HandsSVG />
        </div>
      </div>
      <section className="flex flex-col gap-4 py-16 md:flex-row">
        <Feature
          href={`/rounds/create`}
          title="Create a round"
          description="Create a Quadratic Funding Round to reward community goods in your community."
        >
          <RoundSVG />
        </Feature>
        <Feature
          href={`/grants/create`}
          title="Create a grant"
          description="Doing work in a community?  Create a grant and raise $$$ for your work."
        >
          <GrantSVG />
        </Feature>

        <Feature
          href="mailto:contact@simplegrants.xyz"
          title="Contact Us"
          description="Want to get in touch with the SimpleGrants.xyz team?  Send us an email today."
        >
          <GrantSVG />
        </Feature>
      </section>

      <section className="flex flex-col gap-16 py-16">
        <h3 className="text-center font-heading text-5xl font-bold">
          Discover Grants
        </h3>
        <DiscoverGrants limit={3} />

        <div className="flex justify-center">
          <Button variant="primary" as={Link} href={"/grants"}>
            See all grants
          </Button>
        </div>
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
  href,
  children,
}: PropsWithChildren<{ title: string; description: string; href: string }>) {
  return (
    <A
      href={href}
      className="flex h-48 items-center justify-between gap-4 rounded-3xl bg-gray-900 px-12 py-6 text-white hover:bg-gray-800 md:w-1/2"
    >
      <div className="">
        <h3 className="mb-2 flex items-center gap-4 text-3xl font-semibold">
          {title} <ChevronRight className="size-10" />
        </h3>
        <p className="text-lg">{description}</p>
      </div>
      <div>{children}</div>
    </A>
  );
}

function A(props: ComponentProps<typeof Link>) {
  return (
    <Link
      className="underline underline-offset-2 hover:text-gray-300"
      {...props}
    />
  );
}

function GrantSVG() {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18.5" cy="18.5" r="18.5" fill="white" />
    </svg>
  );
}
function RoundSVG() {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.29876 27.6948C6.51092 26.4826 6.51092 24.5173 5.29876 23.3052C4.08659 22.093 2.12128 22.093 0.909122 23.3052C-0.303041 24.5173 -0.303041 26.4826 0.909122 27.6948C2.12128 28.907 4.08659 28.907 5.29876 27.6948Z"
        fill="white"
      />
      <path
        d="M13.0967 35.4927C14.4925 34.0969 14.4925 31.8338 13.0967 30.438C11.7008 29.0422 9.43776 29.0422 8.04193 30.438C6.64611 31.8338 6.64611 34.0969 8.04193 35.4927C9.43776 36.8885 11.7008 36.8885 13.0967 35.4927Z"
        fill="white"
      />
      <path
        d="M20.562 42.9581C21.9578 41.5622 21.9578 39.2992 20.562 37.9033C19.1662 36.5075 16.9031 36.5075 15.5073 37.9033C14.1115 39.2992 14.1115 41.5622 15.5073 42.9581C16.9031 44.3539 19.1662 44.3539 20.562 42.9581Z"
        fill="white"
      />
      <path
        d="M27.6948 50.0909C28.907 48.8787 28.907 46.9134 27.6948 45.7012C26.4827 44.4891 24.5174 44.4891 23.3052 45.7012C22.093 46.9134 22.093 48.8787 23.3052 50.0909C24.5174 51.303 26.4827 51.303 27.6948 50.0909Z"
        fill="white"
      />
      <path
        d="M13.0967 20.562C14.4925 19.1662 14.4925 16.9031 13.0967 15.5073C11.7008 14.1115 9.43776 14.1115 8.04193 15.5073C6.64611 16.9031 6.64611 19.1662 8.04193 20.562C9.43776 21.9578 11.7008 21.9578 13.0967 20.562Z"
        fill="white"
      />
      <path
        d="M20.9516 28.4169C22.5625 26.8059 22.5625 24.194 20.9516 22.5831C19.3406 20.9721 16.7287 20.9721 15.1177 22.5831C13.5068 24.194 13.5068 26.8059 15.1177 28.4169C16.7287 30.0279 19.3406 30.0279 20.9516 28.4169Z"
        fill="white"
      />
      <path
        d="M28.4169 35.8823C30.0279 34.2713 30.0279 31.6594 28.4169 30.0484C26.806 28.4375 24.1941 28.4375 22.5831 30.0484C20.9721 31.6594 20.9721 34.2713 22.5831 35.8823C24.1941 37.4932 26.806 37.4932 28.4169 35.8823Z"
        fill="white"
      />
      <path
        d="M35.4927 42.9581C36.8886 41.5622 36.8886 39.2992 35.4927 37.9033C34.0969 36.5075 31.8338 36.5075 30.438 37.9033C29.0422 39.2992 29.0422 41.5622 30.438 42.9581C31.8338 44.3539 34.0969 44.3539 35.4927 42.9581Z"
        fill="white"
      />
      <path
        d="M20.562 13.0966C21.9578 11.7008 21.9578 9.43775 20.562 8.04193C19.1662 6.6461 16.9031 6.6461 15.5073 8.04193C14.1115 9.43775 14.1115 11.7008 15.5073 13.0966C16.9031 14.4925 19.1662 14.4925 20.562 13.0966Z"
        fill="white"
      />
      <path
        d="M28.4169 20.9516C30.0279 19.3406 30.0279 16.7287 28.4169 15.1177C26.806 13.5068 24.1941 13.5068 22.5831 15.1177C20.9721 16.7287 20.9721 19.3406 22.5831 20.9516C24.1941 22.5625 26.806 22.5625 28.4169 20.9516Z"
        fill="white"
      />
      <path
        d="M35.8823 28.4169C37.4933 26.8059 37.4933 24.194 35.8823 22.5831C34.2713 20.9721 31.6594 20.9721 30.0484 22.5831C28.4375 24.194 28.4375 26.8059 30.0484 28.4169C31.6594 30.0279 34.2713 30.0279 35.8823 28.4169Z"
        fill="white"
      />
      <path
        d="M42.9581 35.4927C44.3539 34.0969 44.3539 31.8338 42.9581 30.438C41.5623 29.0422 39.2992 29.0422 37.9034 30.438C36.5075 31.8338 36.5075 34.0969 37.9034 35.4927C39.2992 36.8885 41.5623 36.8885 42.9581 35.4927Z"
        fill="white"
      />
      <path
        d="M27.6948 5.29874C28.907 4.08658 28.907 2.12128 27.6948 0.909122C26.4827 -0.303041 24.5174 -0.303041 23.3052 0.909122C22.093 2.12128 22.093 4.08658 23.3052 5.29874C24.5174 6.51091 26.4827 6.51091 27.6948 5.29874Z"
        fill="white"
      />
      <path
        d="M35.4927 13.0966C36.8886 11.7008 36.8886 9.43775 35.4927 8.04192C34.0969 6.6461 31.8338 6.6461 30.438 8.04193C29.0422 9.43775 29.0422 11.7008 30.438 13.0966C31.8338 14.4925 34.0969 14.4925 35.4927 13.0966Z"
        fill="white"
      />
      <path
        d="M42.9581 20.562C44.3539 19.1662 44.3539 16.9031 42.9581 15.5073C41.5623 14.1114 39.2992 14.1115 37.9034 15.5073C36.5075 16.9031 36.5075 19.1662 37.9034 20.562C39.2992 21.9578 41.5623 21.9578 42.9581 20.562Z"
        fill="white"
      />
      <path
        d="M50.0909 27.6948C51.303 26.4826 51.303 24.5173 50.0909 23.3052C48.8787 22.093 46.9134 22.093 45.7013 23.3052C44.4891 24.5173 44.4891 26.4826 45.7013 27.6948C46.9134 28.907 48.8787 28.907 50.0909 27.6948Z"
        fill="white"
      />
    </svg>
  );
}
function HandsSVG() {
  return (
    <svg
      width="233"
      height="233"
      viewBox="0 0 233 233"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M76.1572 193.86C76.1571 193.86 76.1571 193.86 75.3284 194.42L76.1571 193.86L76.1034 193.78L76.0355 193.712C74.5387 192.216 74.5387 189.784 76.0355 188.287C77.5199 186.803 79.9232 186.791 81.4229 188.25L91.5778 200.979L93.3595 203.212V200.355V162.349C93.3595 160.253 95.0382 158.551 97.1217 158.511L97.1229 158.511C99.2484 158.469 101.035 160.265 101.035 162.444V187.695C101.035 189.037 102.123 190.125 103.465 190.125C104.803 190.125 105.901 189.041 105.901 187.695V154.07C105.901 151.95 107.618 150.232 109.738 150.232C111.858 150.232 113.576 151.95 113.576 154.07V187.531C113.576 188.873 114.664 189.961 116.006 189.961C117.351 189.961 118.442 188.875 118.442 187.531V157.616C118.442 155.509 120.046 153.821 122.205 153.778C124.331 153.735 126.117 155.532 126.117 157.71V186.026C126.117 187.368 127.205 188.456 128.547 188.456C129.885 188.456 130.983 187.372 130.983 186.026V162.344C130.983 160.237 132.587 158.55 134.746 158.506C136.872 158.464 138.658 160.26 138.658 162.439V206.881V206.897L138.659 206.913C138.884 214 137.066 220.374 133.133 224.903C129.22 229.409 123.106 232.216 114.458 231.987C106.914 231.786 99.9045 228.037 95.4405 221.956L95.1544 221.549C91.3814 216.181 86.6327 209.26 82.8256 203.678C80.9224 200.888 79.2551 198.433 78.0637 196.676C77.468 195.797 76.9913 195.093 76.6635 194.609L76.2874 194.053L76.1901 193.909L76.1654 193.872L76.1592 193.863L76.1576 193.861L76.1572 193.86Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M27.2782 176.056C28.4068 169.589 29.943 161.336 31.1975 154.697C31.8247 151.378 32.3812 148.464 32.781 146.379C32.9809 145.337 33.1416 144.502 33.2523 143.928L33.3795 143.268L33.4125 143.098L33.4208 143.055L33.4229 143.044L33.4235 143.041L33.4236 143.04C33.4236 143.04 33.4236 143.04 32.4419 142.85L33.4236 143.04L33.4419 142.946V142.85C33.4419 140.73 35.1597 139.012 37.2795 139.012C39.3817 139.012 41.0885 140.702 41.1168 142.797L39.2957 158.979L38.9761 161.819L40.9965 159.798L67.8717 132.923C69.3529 131.442 71.7447 131.426 73.2455 132.872L73.247 132.873C74.78 134.344 74.7724 136.878 73.2321 138.418L55.3766 156.273C54.4248 157.225 54.4248 158.762 55.3766 159.714C56.3284 160.666 57.8654 160.666 58.8172 159.714C58.8172 159.714 58.8172 159.714 58.8173 159.714L82.5931 135.943L82.5932 135.943C84.09 134.446 86.5214 134.446 88.0182 135.943C89.5151 137.44 89.5151 139.871 88.0182 141.368L64.3565 165.03C63.4048 165.982 63.4048 167.519 64.3565 168.47C65.3083 169.422 66.8454 169.422 67.7972 168.47L88.9507 147.317C90.4318 145.836 92.8237 145.82 94.3245 147.265L94.3259 147.267C95.859 148.738 95.8514 151.271 94.3111 152.812L74.2851 172.838C73.3333 173.789 73.3333 175.326 74.2851 176.278C75.2369 177.23 76.774 177.23 77.7258 176.278L94.4736 159.535L94.4737 159.535C95.9549 158.054 98.3467 158.038 99.8475 159.484L99.849 159.485C101.382 160.956 101.374 163.489 99.8342 165.03L68.4094 196.455L68.398 196.466L68.3871 196.478C63.5393 201.648 57.7478 204.87 51.7643 205.292C45.8119 205.712 39.5027 203.373 33.55 197.094L33.5497 197.094C28.2396 191.498 25.9505 183.674 27.2781 176.056L27.2782 176.056Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M39.1449 76.9095C39.145 76.9094 39.1451 76.9094 38.5854 76.0807L39.1451 76.9094L39.2246 76.8557L39.2925 76.7878C40.7893 75.2909 43.2206 75.2909 44.7175 76.7878C46.2019 78.2722 46.2142 80.6755 44.7546 82.1752L32.0264 92.33L29.7932 94.1117H32.6501H70.6558C72.7523 94.1117 74.4542 95.7904 74.4936 97.8739L74.4936 97.8751C74.5364 100.001 72.7397 101.787 70.5614 101.787H45.3104C43.9684 101.787 42.8799 102.875 42.8799 104.217C42.8799 105.555 43.9639 106.653 45.3104 106.653H78.9304C81.0503 106.653 82.7681 108.371 82.7681 110.49C82.7681 112.61 81.0503 114.328 78.9304 114.328H45.4693C44.1273 114.328 43.0389 115.417 43.0389 116.759C43.0389 118.103 44.125 119.194 45.4693 119.194H75.3842C77.4807 119.194 79.1826 120.873 79.222 122.956L79.222 122.957C79.2648 125.083 77.4681 126.869 75.2898 126.869H46.9742C45.6322 126.869 44.5438 127.958 44.5438 129.3C44.5438 130.637 45.6277 131.735 46.9742 131.735H70.6558C72.7523 131.735 74.4542 133.414 74.4936 135.497L74.4936 135.498C74.5364 137.624 72.7397 139.41 70.5614 139.41H26.1188H26.1029L26.087 139.411C19.0004 139.636 12.6264 137.818 8.09683 133.885C3.59085 129.973 0.783634 123.858 1.01305 115.211C1.21238 107.71 4.91492 100.738 10.9371 96.2712L11.4557 95.9066C16.8237 92.1337 23.7451 87.385 29.327 83.5778C32.1174 81.6746 34.5721 80.0074 36.3292 78.816C37.2077 78.2203 37.9118 77.7436 38.3962 77.4158L38.9524 77.0396L39.0963 76.9423L39.1328 76.9176L39.142 76.9114L39.1443 76.9099L39.1449 76.9095ZM80.2218 122.937C80.1721 120.31 78.0265 118.194 75.3842 118.194H45.4693C44.6796 118.194 44.0389 117.553 44.0389 116.759C44.0389 115.969 44.6796 115.328 45.4693 115.328H78.9304C81.6026 115.328 83.7681 113.163 83.7681 110.49C83.7681 107.818 81.6026 105.653 78.9304 105.653H45.3104C44.5206 105.653 43.8799 105.007 43.8799 104.217C43.8799 103.428 44.5206 102.787 45.3104 102.787H70.5614C73.2733 102.787 75.5481 100.567 75.4934 97.855L80.2218 122.937Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M35.9015 34.3009C41.4976 28.9908 49.3221 26.7016 56.9398 28.0293L56.94 28.0293C63.4069 29.158 71.6596 30.6941 78.2986 31.9487C81.6175 32.5758 84.532 33.1324 86.6166 33.5322C87.659 33.7321 88.4938 33.8927 89.068 34.0034L89.7272 34.1307L89.8978 34.1636L89.9411 34.172L89.952 34.1741L89.9547 34.1746L89.9554 34.1748C89.9555 34.1748 89.9556 34.1748 90.1457 33.193L89.9556 34.1748L90.0498 34.193H90.1457C92.2655 34.193 93.9833 35.9108 93.9833 38.0307C93.9833 40.1328 92.294 41.8396 90.1986 41.8679L74.0162 40.0468L71.1769 39.7273L73.1972 41.7476L100.072 68.6228C101.554 70.104 101.57 72.4958 100.124 73.9967L100.122 73.9981C98.6517 75.5311 96.1181 75.5236 94.5779 73.9833L76.7223 56.1278C75.7706 55.176 74.2334 55.176 73.2817 56.1278C72.3299 57.0795 72.3299 58.6166 73.2816 59.5683C73.2816 59.5684 73.2816 59.5684 73.2817 59.5684L97.0526 83.3443L97.0526 83.3443C98.5495 84.8412 98.5495 87.2725 97.0526 88.7694C95.5558 90.2662 93.1245 90.2662 91.6276 88.7694L67.9659 65.1077C67.0141 64.1559 65.477 64.1559 64.5252 65.1077C63.5735 66.0594 63.5735 67.5966 64.5252 68.5483L85.6787 89.7018C87.1599 91.183 87.1758 93.5748 85.7302 95.0756L85.7288 95.0771C84.258 96.6101 81.7244 96.6026 80.1842 95.0623L60.1581 75.0363C59.2064 74.0845 57.6693 74.0845 56.7175 75.0363C55.7657 75.988 55.7657 77.5251 56.7175 78.4769L73.4604 95.2248L73.4605 95.2249C74.9416 96.706 74.9576 99.0979 73.5119 100.599L73.5105 100.6C72.0398 102.133 69.5062 102.126 67.9659 100.585L36.5412 69.1606L36.5298 69.1492L36.5181 69.1382C31.3481 64.2904 28.1261 58.499 27.7039 52.5154C27.2839 46.563 29.6225 40.2539 35.9012 34.3012L35.9015 34.3009Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M156.083 39.8967C156.083 39.8968 156.083 39.8969 156.912 39.3372L156.083 39.8969L156.137 39.9764L156.205 40.0443C157.702 41.5411 157.702 43.9725 156.205 45.4693C154.72 46.9537 152.317 46.9661 150.817 45.5064L140.663 32.7782L138.881 30.545V33.4019V71.4076C138.881 73.5144 137.276 75.202 135.117 75.2454C132.992 75.2883 131.206 73.4915 131.206 71.3132V46.0622C131.206 44.7202 130.117 43.6317 128.775 43.6317C127.438 43.6317 126.34 44.7157 126.34 46.0622V79.6822C126.34 81.8021 124.622 83.5199 122.502 83.5199C120.382 83.5199 118.665 81.8021 118.665 79.6822V46.2211C118.665 44.8814 117.583 43.7907 116.234 43.7907C114.889 43.7907 113.799 44.8769 113.799 46.2211V76.136C113.799 78.2325 112.12 79.9344 110.037 79.9738L110.035 79.9738C107.91 80.0166 106.123 78.2199 106.123 76.0416V47.7261C106.123 46.384 105.035 45.2956 103.693 45.2956C102.356 45.2956 101.258 46.3795 101.258 47.7261V71.4076C101.258 73.5041 99.5789 75.206 97.4954 75.2454L97.4942 75.2454C95.3686 75.2883 93.5823 73.4915 93.5823 71.3132V26.8706V26.8547L93.5818 26.8388C93.3565 19.7523 95.1747 13.3782 99.1076 8.84866C103.02 4.34268 109.134 1.53547 117.782 1.76488C125.282 1.96421 132.254 5.66679 136.721 11.689L137.086 12.2076C140.859 17.5756 145.608 24.4969 149.415 30.0789C151.318 32.8693 152.985 35.3239 154.177 37.081C154.772 37.9595 155.249 38.6636 155.577 39.148L155.953 39.7042L156.05 39.8481L156.075 39.8847L156.081 39.8938L156.083 39.8961L156.083 39.8967ZM97.5143 76.2452C100.142 76.1956 102.258 74.0499 102.258 71.4076V47.7261C102.258 46.9363 102.903 46.2956 103.693 46.2956C104.483 46.2956 105.123 46.9363 105.123 47.7261V76.0416C105.123 78.7535 107.344 81.0282 110.055 80.9736L97.5143 76.2452Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M198.695 36.6525L198.695 36.6522C192.742 30.3735 186.433 28.0349 180.481 28.4549C174.497 28.877 168.706 32.0991 163.858 37.269L163.847 37.2808L163.835 37.2921L132.411 68.7169C130.87 70.2572 130.863 72.7907 132.396 74.2615L132.397 74.2629C133.898 75.7086 136.29 75.6926 137.771 74.2114L137.771 74.2113L154.519 57.4685C155.471 56.5167 157.008 56.5167 157.96 57.4685C158.911 58.4202 158.911 59.9573 157.96 60.9091L137.934 80.9351C136.393 82.4754 136.386 85.009 137.919 86.4798L137.92 86.4812C139.421 87.9268 141.813 87.9109 143.294 86.4297L164.448 65.2762C165.399 64.3245 166.937 64.3245 167.888 65.2762C168.84 66.228 168.84 67.7651 167.888 68.7169L144.227 92.3786C142.73 93.8754 142.73 96.3068 144.227 97.8036C145.723 99.3005 148.155 99.3005 149.652 97.8036L149.652 97.8035L173.428 74.0326C174.379 73.0809 175.916 73.0809 176.868 74.0326C177.82 74.9844 177.82 76.5215 176.868 77.4733L159.013 95.3288C157.472 96.8691 157.465 99.4027 158.998 100.873L158.999 100.875C160.5 102.321 162.892 102.305 164.373 100.823L191.248 73.9482L193.269 71.9278L192.949 74.7671L198.695 36.6525ZM198.695 36.6525C204.005 42.2486 206.294 50.073 204.967 57.6907M198.695 36.6525L204.967 57.6907M204.967 57.6907C203.838 64.1577 202.302 72.4105 201.047 79.0496C200.42 82.3685 199.864 85.283 199.464 87.3676C199.264 88.4099 199.103 89.2448 198.993 89.819L198.865 90.4782L198.832 90.6487L198.824 90.6921L198.822 90.7029L198.821 90.7057L198.821 90.7063C198.821 90.7065 198.821 90.7066 199.803 90.8967L204.967 57.6907Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M193.109 156.837C193.109 156.837 193.109 156.837 193.669 157.666L193.109 156.837L193.029 156.891L192.962 156.958C191.465 158.455 189.033 158.455 187.537 156.958C186.052 155.474 186.04 153.071 187.499 151.571L200.228 141.416L202.461 139.635H199.604H161.598C159.502 139.635 157.8 137.956 157.76 135.872L157.76 135.871C157.718 133.746 159.514 131.959 161.693 131.959H186.944C188.286 131.959 189.374 130.871 189.374 129.529C189.374 128.191 188.29 127.093 186.944 127.093H153.319C151.199 127.093 149.481 125.376 149.481 123.256C149.481 121.136 151.199 119.418 153.319 119.418H186.78C188.122 119.418 189.21 118.33 189.21 116.988C189.21 115.643 188.124 114.552 186.78 114.552H156.865C154.758 114.552 153.071 112.948 153.027 110.789C152.984 108.663 154.781 106.877 156.959 106.877H185.275C186.617 106.877 187.705 105.789 187.705 104.447C187.705 103.109 186.621 102.011 185.275 102.011H161.593C159.486 102.011 157.799 100.407 157.755 98.2479C157.713 96.1223 159.509 94.336 161.688 94.336H206.13H206.146L206.162 94.3355C213.249 94.1102 219.623 95.9284 224.152 99.8612C228.658 103.774 231.465 109.888 231.236 118.536C231.035 126.08 227.286 133.09 221.205 137.554L220.798 137.84C215.43 141.613 208.509 146.361 202.927 150.168C200.137 152.072 197.682 153.739 195.925 154.93C195.046 155.526 194.342 156.003 193.858 156.33L193.302 156.707L193.158 156.804L193.121 156.829L193.112 156.835L193.11 156.836L193.109 156.837Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M196.342 199.445L196.342 199.446C190.746 204.756 182.921 207.045 175.304 205.717C168.837 204.588 160.584 203.052 153.945 201.798C150.626 201.171 147.711 200.614 145.627 200.214C144.584 200.014 143.75 199.854 143.175 199.743L142.516 199.616L142.346 199.583L142.302 199.574L142.291 199.572L142.289 199.572L142.288 199.572C142.288 199.572 142.288 199.572 142.098 200.553L142.288 199.572L142.194 199.553H142.098C139.978 199.553 138.26 197.836 138.26 195.716C138.26 193.614 139.949 191.907 142.045 191.878L158.227 193.7L161.067 194.019L159.046 191.999L132.171 165.124C130.69 163.642 130.674 161.251 132.12 159.75L132.121 159.748C133.592 158.215 136.125 158.223 137.666 159.763L155.521 177.619C156.473 178.57 158.01 178.57 158.962 177.619C159.913 176.667 159.914 175.13 158.962 174.178C158.962 174.178 158.962 174.178 158.962 174.178L135.191 150.402L135.191 150.402C133.694 148.905 133.694 146.474 135.191 144.977C136.688 143.48 139.119 143.48 140.616 144.977L164.278 168.639C165.229 169.591 166.766 169.591 167.718 168.639C168.67 167.687 168.67 166.15 167.718 165.198L146.565 144.045C145.084 142.563 145.068 140.172 146.513 138.671L146.515 138.669C147.985 137.136 150.519 137.144 152.059 138.684L172.085 158.71C173.037 159.662 174.574 159.662 175.526 158.71C176.478 157.758 176.478 156.221 175.526 155.27L158.783 138.522L158.783 138.522C157.302 137.04 157.286 134.649 158.731 133.148L158.733 133.146C160.204 131.613 162.737 131.621 164.278 133.161L195.702 164.586L195.714 164.597L195.725 164.608C200.895 169.456 204.117 175.247 204.54 181.231C204.96 187.183 202.621 193.493 196.342 199.445Z"
        fill="#FEC89A"
        stroke="#D9A596"
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>
  );
}
