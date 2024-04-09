import { Markdown } from "~/components/ui/markdown";

export default function AboutPage() {
  return (
    <Markdown className={"mx-auto pt-16"}>{`
# About SimpleGrants

## Our Mission

At SimpleGrants, we are committed to fostering an equitable and impactful approach to funding diverse projects and initiatives. Our platform leverages the principles of quadratic funding to democratize the distribution of grants, ensuring a fair and community-focused allocation of resources.

## What is Quadratic Funding?

Quadratic funding is a mathematical approach to allocate funds in a way that balances the influence of both large and small contributors. This method amplifies the impact of smaller donations, ensuring that the number of contributors is as important as the amount contributed. It's designed to reflect the broader interests of a community, not just those with significant financial power.

## How SimpleGrants Works

- **Proposal Submission**: Innovators and project leaders submit their proposals for funding on our platform. Each proposal is vetted for feasibility, impact, and alignment with our values.

- **Community Engagement**: Our platform enables community members to browse and support projects that resonate with them. Contributions can range from small to large, with each amount playing a significant role.

- **Quadratic Matching**: At the end of each funding cycle, SimpleGrants calculates the total amount to be granted to each project using the quadratic funding formula. This ensures a balanced and equitable distribution of funds, prioritizing the number of supporters over the total amount raised.

- **Transparency and Accountability**: We maintain a high standard of transparency and accountability. Contributors and project leaders can track funding progress, and we regularly publish reports detailing the allocation and impact of grants.

## Our Values

- **Inclusivity**: We believe in leveling the playing field for all innovators and creators, regardless of their background or resources.

- **Community-Driven**: Our approach is rooted in the power of community support, valuing collective decisions over individual wealth.

- **Transparency**: We uphold a transparent process in both funding allocation and platform operations, ensuring trust and integrity.

- **Impact Focus**: We prioritize projects that promise significant and positive impact, be it social, environmental, or technological.

## Our Team

SimpleGrants is run by a dedicated team of professionals with diverse backgrounds in technology, finance, non-profit management, and community organizing. We share a common vision of a more democratic and inclusive funding system.

## Get Involved

- **As a Project Innovator**: If you have a project that seeks funding, learn more about our submission process and criteria.

- **As a Contributor**: Whether you can contribute a small amount or more, your support is valuable. Explore ongoing projects and contribute to the causes you believe in.

- **As a Partner**: We welcome partnerships with organizations and individuals who share our values and mission.

## Contact Us

For more information, inquiries, or feedback, please [contact us](mailto:contact@simplegrants.xyz).

We look forward to fostering a more equitable and impactful funding landscape together.

---

SimpleGrants: Funding, Democratically.
     `}</Markdown>
  );
}
