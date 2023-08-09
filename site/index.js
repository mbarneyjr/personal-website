// RUM
(async function() {
  const response = await fetch('/rum.json');
  const data = await response.json();
  const region = data.AppMonitor.AppMonitorConfiguration.IdentityPoolId.split(':')[0];
  const rumSettings = {
    sessionSampleRate: data.AppMonitor.AppMonitorConfiguration.SessionSampleRate,
    guestRoleArn: data.AppMonitor.AppMonitorConfiguration.GuestRoleArn,
    identityPoolId: data.AppMonitor.AppMonitorConfiguration.IdentityPoolId,
    endpoint: `https://dataplane.rum.${region}.amazonaws.com`,
    telemetries: data.AppMonitor.AppMonitorConfiguration.Telemetries,
    allowCookies: data.AppMonitor.AppMonitorConfiguration.AllowCookies,
    enableXRay: data.AppMonitor.AppMonitorConfiguration.EnableXRay,
  };
  (function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;document.head.insertBefore(z,document.head.getElementsByTagName('script')[0]);})(
    'cwr',
    data.AppMonitor.Id,
    '1.0.0',
    region,
    'https://client.rum.us-east-1.amazonaws.com/1.5.x/cwr.js',
    rumSettings,
  );
})();
