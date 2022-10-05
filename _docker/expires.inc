# cache.appcache, your document html and data
location ~* \.(?:manifest|appcache|html?|xml|json)$ {
  add_header Cache-Control "public, max-age=31536000";
  add_header Expires "Fri, 21 Nov 2121 10:10:10 GMT";
  add_header Strict-Transport-Security "max-age=2592000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff";
  add_header X-XSS-Protection "1; mode=block";
  add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://depf2pm92it9f.cloudfront.net https://www.google-analytics.com https://www.googletagmanager.com https://dfe-writers.netlify.app https://*.cloudfront.net https://api.feed.co.id/ https://api.dev.feed.co.id/ https://api.beta.feed.co.id https://console.dev.telkomseldfe.com https://console.telkomseldfe.com  https://dwvy4ad9wa3z2.cloudfront.net https://d269espqi4bd3q.cloudfront.net https://depf2pm92it9f.cloudfront.net https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://maps.gstatic.com https://maps.googleapis.com https://fonts.googleapis.com https://fonts.gstatic.com https://maps.google.com;script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://unpkg.com https://identity.netlify.com https://*.cloudfront.net https://code.jquery.com https://dwvy4ad9wa3z2.cloudfront.net https://d269espqi4bd3q.cloudfront.net https://depf2pm92it9f.cloudfront.net https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://maps.gstatic.com https://maps.googleapis.com;style-src 'self' 'unsafe-inline' 'unsafe-eval' https://identity.netlify.com https://*.cloudfront.net https://dwvy4ad9wa3z2.cloudfront.net https://dwvy4ad9wa3z2.cloudfront.net https://d269espqi4bd3q.cloudfront.net https://depf2pm92it9f.cloudfront.net https://cdnjs.cloudflare.com https://fonts.googleapis.com https://cdn.jsdelivr.net;style-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://identity.netlify.com https://*.cloudfront.net https://dwvy4ad9wa3z2.cloudfront.net https://d269espqi4bd3q.cloudfront.net https://depf2pm92it9f.cloudfront.net https://cdnjs.cloudflare.com https://fonts.googleapis.com https://cdn.jsdelivr.net;img-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://dwvy4ad9wa3z2.cloudfront.net https://*.cloudfront.net https://depf2pm92it9f.cloudfront.net https://www.google.com https://maps.gstatic.com https://maps.googleapis.com https://khms1.googleapis.com https://d269espqi4bd3q.cloudfront.net;media-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudfront.net https://dwvy4ad9wa3z2.cloudfront.net https://d269espqi4bd3q.cloudfront.net https://depf2pm92it9f.cloudfront.net;frame-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudfront.net https://dwvy4ad9wa3z2.cloudfront.net https://www.google.com https://maps.google.com;font-src 'self' 'unsafe-inline' 'unsafe-eval' https://depf2pm92it9f.cloudfront.net https://*.cloudfront.net https://dwvy4ad9wa3z2.cloudfront.net https://depf2pm92it9f.cloudfront.net https://fonts.gstatic.com https://d269espqi4bd3q.cloudfront.net;";
  add_header Referrer-Policy "no-referrer-when-downgrade";

}

location ~* \.(eot|ttf|woff)$ {
   add_header Access-Control-Allow-Origin "https://feed.co.id https://dev.feed.co.id https://telkomseldfe.com https://dev.telkomseldfe.com https://beta.telkomseldfe.com https://console.telkomseldfe.com";
   add_header Referrer-Policy "no-referrer-when-downgrade";
}

# Feed
location ~* \.(?:rss|atom)$ {
  expires 1h;
  add_header Cache-Control "public";
  add_header Expires "Fri, 21 Nov 2121 10:10:10 GMT";
  add_header Strict-Transport-Security "max-age=2592000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff";
  add_header X-XSS-Protection "1; mode=block";
  add_header Referrer-Policy "no-referrer-when-downgrade";
}

# Media: images, icons, video, audio, HTC
location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
  expires 1M;
  access_log off;
  add_header Cache-Control "public";
  add_header Expires "Fri, 21 Nov 2121 10:10:10 GMT";
  add_header Strict-Transport-Security "max-age=2592000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff";
  add_header X-XSS-Protection "1; mode=block";
  add_header Referrer-Policy "no-referrer-when-downgrade";
}

# CSS and Javascript
location ~* \.(?:css|js)$ {
  expires 1y;
  access_log off;
  add_header Cache-Control "public";
  add_header Expires "Fri, 21 Nov 2121 10:10:10 GMT";
  add_header Strict-Transport-Security "max-age=2592000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff";
  add_header X-XSS-Protection "1; mode=block";
  add_header Referrer-Policy "no-referrer-when-downgrade";
}
