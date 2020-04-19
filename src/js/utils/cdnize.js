const cdnDomain = 'https://d17ebxoafldccc.cloudfront.net';
const prodDomain = 'https://brilliantminds.co';

export const cdnize = url => {
  if (location.origin === prodDomain) {
    url = url.replace(prodDomain, cdnDomain);
    if (url.startsWith('/')) {
      url = `${cdnDomain}${url}`;
    }
  }

  return url;
};
