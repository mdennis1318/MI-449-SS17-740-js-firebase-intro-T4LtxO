// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAsXhq_MXXHb8nUOrIGeKBEjIaJlIeu_rg',
  authDomain: 'woofer-messaging.firebaseapp.com',
  databaseURL: 'https://woofer-messaging.firebaseio.com',
  projectId: 'woofer-messaging',
  storageBucket: 'woofer-messaging.appspot.com',
  messagingSenderId: '441261599999'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  firebase.database().ref('woofs').push(woof)
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  // added woof
  firebase.database().ref('woofs').on('child_added', function (newJokeSnapshot) {
    addWoofRow(newJokeSnapshot.key, newJokeSnapshot.val())
  })

  // changed woof
  firebase.database().ref('woofs').on('child_changed', function (updateJokeSnapshot) {
    updateWoofRow(updateJokeSnapshot.key, updateJokeSnapshot.val())
  })

  // deleted woof
  firebase.database().ref('woofs').on('child_removed', function (deletedJokeSnapshot) {
    deleteWoofRow(deletedJokeSnapshot.key)
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs').child(woofKey).child('text').set(woofText)
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
