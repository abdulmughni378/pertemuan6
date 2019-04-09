var CACHE_NAME = 'abdulm-cache';
var urlsToCache = [ 
'.',
 'index.html', 
 'css/cv-item.css'];
 self.addEventListener('install', function(event) {
 	//pada syntax diatas adalah membuat cache kertika browser manmpilkan index.html beserta dng cssnya, dan menambahkan fungsi listener u/ mengintall fungsio event 
  event.waitUntil( 
  	caches.open(CACHE_NAME) 
  	.then(function(cache){
  	 return cache.addAll(urlsToCache);
  	 //kemudian setelah diintall membuka cache beserta nama dan dimasukan ke url
  })
   );
});

 self.addEventListener('fetch', function(event) {
   event.respondWith(    
   caches.match(event.request)    
   .then(function(response) {      
   return response || fetchAndCache(event.request);  
   // menambahkan eventlistener untuk fetch atau mengambil function event setelah bisa maka akan mengembalikan nilai response
     	}) 
     	 );
      	});
      	function fetchAndCache(url) { 
      	 return fetch(url)
      	   .then(function(response) { 
      	      // memastikan untuk mandapatkan jawaban yang valid dari fetch dan cache yang telah dibuat  
      	        if (!response.ok) { 
      	             throw Error(response.statusText); 
      	                }   
      	                 return caches.open(CACHE_NAME)  
      	                   .then(function(cache) {  
      	                       cache.put(url, response.clone());  
      	                           return response;    
      	                           //membuat mengembalikan nilai salinan responsse
      	                      		 });
      	                         }) 
      	                          .catch(function(error) {  
      	                             console.log('Request failed:', error);  
      	                               // mengembalikan nilai yang error 
      	                           });
      	                      }