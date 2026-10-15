{
  perSystem =
    { self', pkgs, ... }:
    {
      packages.lambda = pkgs.buildNpmPackage {
        pname = "barneydev";
        version = "0.0.0";
        src = pkgs.lib.fileset.toSource {
          root = ../.;
          fileset = pkgs.lib.fileset.unions [
            ../package.json
            ../package-lock.json
            ../packages
          ];
        };
        npmDepsHash = "sha256-2pRKjbv9CWkE9tHGgQZ5olJmkkQLIeeVPODsBqfcqyc=";
        dontNpmBuild = true;
      };
      packages.zip = pkgs.runCommand "barneydev-zip" { nativeBuildInputs = [ pkgs.zip ]; } ''
        cp -r ${self'.packages.lambda}/lib/node_modules/barneydev barneydev
        chmod -R u+w barneydev
        cd barneydev
        find . -exec touch -h -d 1980-01-01T00:00:00Z {} +
        mkdir $out
        find . -mindepth 1 | LC_ALL=C sort | TZ=UTC zip -X -y -D $out/lambda.zip -@ >/dev/null
      '';
    };
}
