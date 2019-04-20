# client
ionic-based client app

## try to play with the interactive prototype

 open [prototype link](https://share.protopie.io/9dc6m6jpqJE) in your browser

It is recommended to install [Protopie](https://itunes.apple.com/us/app/protopie-player-code-free/id1015837511?ls=1&mt=8) and use the link above to experience on your phone
## try to test and run from the source code

### prerequisites
1. Node.js with the latest version (currently 10.15.2)

2. Ionic with the latest version (currently 4.9.0)
    
    `sudo npm install -g ionic`

3. clone this repo to your local place
  
    `git clone https://github.com/17781-city-food-delivery/client.git`

4. you may need to grant full permissions to the directory

    `sudo chown -v -R -L your-username client/` or `sudo chmod -R 777 client`
    
5. install all the dependencies for npm pacakages
    
    `sudo npm install` (you may bump into permission problems if you didn't grant full permissions in the previous step)
    
6. start to try this in the browser

    `sudo ionic serve` and open `localhost:8100` in your browser (Chrome is recommended)
    
## project structure

The main part lies in `/src/app`, and there are different pages of this app
- **cart**

  the cart page, where meals can be added, updated, removed and viewed
 
- **credit**

  the credit page, which shows the user's credits for each restaurants
 
- **dish-detail**

  the dish detail page, which shows details of the meal (picture, price, etc.)
  
- **edit-profile**

  the edit profile page, where the user can edit the personal profile
  
- **restaurant**

  the restaurant page, which lists the meals that are provided by the restaurant
 
- **order-time-loc-filter**

  the order time location filter page, where the user can filter the oders by the time or the delivery location
 
- **owner-meal-list**

  the owner meal list page, where restaurant can edit its meals
 
- **qrcode**

  the qrcode page, which shows the user's QRcode for scanning
 
- **signin**

  the sign in page, where the user can type in the username and password to log in
  
- **signup**

  the sign up page, where the user can register for a new account
 
- **tab1**

  the main page, which shows the main page (time & location selection, advertisement banners, restaurant list)
 
- **tab2**

  the order page, which shows the upcoming and history orders
 
- **tab3**

  the profile page, which contains various profile information of the user
 
- **tabs**

  the tab page, which serves as a container of all 3 tabs
 
