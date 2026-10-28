import { Section } from '#app/ui/pages/lib/section.tsx';
import { layout, space } from '#app/ui/public/styles.ts';

export function Operator() {
  return () => (
    <Section heading="OPERATOR">
      <div mix={[layout.stack, space.gap3]}>
        <p>
          I have worked within the AWS ecosystem since 2017. I started as a "
          <a href="https://twitter.com/forrestbrazeal/status/1051953942492602370">Serverless Native</a>", and most of my
          work since then has been in architecture, CI/CD automation, and security.
        </p>
        <p>
          Outside of work, I run a homelab and a personal AWS organization that hosts a few side projects, and I write
          tools to solve problems I run into.
        </p>
        <p>
          I love reproducible systems. All of my machines, most of my projects, and even this site are built with Nix. I
          also <a href="https://github.com/NixOS/nixpkgs/pulls?q=author%3Ambarneyjr">contribute to nixpkgs</a>.
        </p>
      </div>
    </Section>
  );
}
