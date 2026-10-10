final: prev: {
  pythonPackagesExtensions = prev.pythonPackagesExtensions ++ [
    (pyfinal: pyprev: {
      cfn-lint = pyprev.cfn-lint.overridePythonAttrs (old: {
        version = "1.57.2";
        src = prev.fetchFromGitHub {
          owner = "aws-cloudformation";
          repo = "cfn-lint";
          tag = "v1.57.2";
          hash = "sha256-ncvEMFoeaQzz8lGfnO4CBUax3H3N5mVMLnsQF0wRuv8=";
        };
        doCheck = false;
      });
    })
  ];
}
