// RUM
(async function() {
  const response = await fetch('/rum.json');
  const data = await response.json();
  const region = data.IdentityPoolId.split(':')[0];
  const rumSettings = {
    sessionSampleRate: data.SessionSampleRate,
    guestRoleArn: data.GuestRoleArn,
    identityPoolId: data.IdentityPoolId,
    endpoint: `https://dataplane.rum.${region}.amazonaws.com`,
    telemetries: data.Telemetries,
    allowCookies: data.AllowCookies,
    enableXRay: data.EnableXRay,
  };
  (function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;document.head.insertBefore(z,document.head.getElementsByTagName('script')[0]);})(
    'cwr',
    data.Id,
    '1.0.0',
    region,
    '/scripts/cwr.js',
    rumSettings,
  );
})();
