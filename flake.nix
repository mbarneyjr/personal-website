{
  description = "Flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      shell = { system }:
        let
          pkgs = import nixpkgs {
            system = system;
            config = {
              allowUnfree = true;
            };
          };
        in
        pkgs.mkShell {
          buildInputs = [
            pkgs.awscli2
            pkgs.nodejs_20
            pkgs.python313
          ];
          shellHook = ''
            python3 -m venv .venv
            source .venv/bin/activate
          '';
        };
    in
    {
      devShells.aarch64-darwin.default = shell { system = "aarch64-darwin"; };
      devShells.x86_64-darwin.default = shell { system = "x86_64-darwin"; };
      devShells.aarch64-linux.default = shell { system = "aarch64-linux"; };
      devShells.x86_64-linux.default = shell { system = "x86_64-linux"; };
    };
}

