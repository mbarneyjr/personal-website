# Personal Website

This is my personal website at [barney.dev](https://barney.dev).

## Quick Start

### Prerequisites

- [Nix](https://nixos.org/download.html) with flakes enabled
- AWS credentials configured

### Local Development

```bash
# Enter the development environment
nix develop

# start the local development processes
nix run .#dev
```

The site will be available at `http://localhost:8080`.

## Deployment

Deploy to an environment (dev, qa, or prod):

```bash
./scripts/deploy.sh <environment>
```

This will:

1. Create a CloudFormation changeset
2. Execute the changeset
3. Sync the site files to S3
