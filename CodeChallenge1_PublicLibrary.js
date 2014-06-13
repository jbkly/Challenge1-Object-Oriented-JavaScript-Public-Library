// Define the Book class
var Book = function(bookID, currentShelf, title, author) {
    var book = {
        // Book attributes
        bookID: bookID,
        currentShelf: currentShelf,
        title: title,
        author: author,
        // Book methods
        // Add book to a specific shelf
        enshelf: function(shelf) {
            if (this.currentShelf) this.unshelf(); 
            shelf.shelfContents.push(this);
            this.currentShelf = shelf;
            console.log("Added Book " + this.bookID + " to Shelf #" + shelf.shelfID);
            Library.unshelvedBooks.splice(Library.unshelvedBooks.indexOf(this), 1);
        },
        // Remove book from whatever shelf it's on
        unshelf: function() {
            var i = this.currentShelf.shelfContents;
            i = i.splice(i.indexOf(this), 1);
            this.currentShelf = null;
            Library.unshelvedBooks.push(this);
            console.log("Removed Book " + this.bookID + " from its shelf");
        }
    };
    return book;
};

// Define the Shelf class
var Shelf = function(shelfID) {
    var shelf = {
        // Shelf attributes
        shelfID: shelfID,
        shelfContents: []
    };
    return shelf;
};

// Define the Library class
var Library = {
    // Library attributes
    libShelves: [],
    unshelvedBooks: [],
    numShelves: 10,
    numBooks: 100,
    // Library methods
    init: function() {
        // Create some books and shelves
        for (var i = 0; i < this.numShelves; i++) {
            var shelf = new Shelf(i + 1);
            for (var j = 0; j < this.numBooks/this.numShelves; j++) {
                var book = new Book(i * this.numShelves + j + 1, shelf);
                shelf.shelfContents.push(book);
            }
            this.libShelves.push(shelf);
        }
        console.log("Library initiated");
    },
    countShelves: function() {
       var numShelves = this.libShelves.length;
        console.log("The Library contains " + numShelves + " shelves.");
        return numShelves;
    },
    report: function() {
        console.log("The Library contains " + this.numShelves + " shelves and " + this.numBooks + " books.");
        if (this.unshelvedBooks.length > 0) {
            console.log("There are " + this.unshelvedBooks.length + " unshelved book(s).");
        }
        for (var i = 0; i < this.libShelves.length; i++) {
            var thisShelf = this.libShelves[i];
            console.log("Shelf #" + thisShelf.shelfID + ": \n");
            for (var j = 0; j < thisShelf.shelfContents.length; j++) {
                var thisBook = thisShelf.shelfContents[j];
                console.log("Book " + thisBook.bookID + "\n");
            }
        }
    }
};

Library.init();
// Tests
var shelf1 = Library.libShelves[0];
var shelf10 = Library.libShelves[9];
var book1 = shelf1.shelfContents[0];
var book2 = shelf1.shelfContents[1];
var book100 = shelf10.shelfContents[9];
Library.countShelves();
Library.report();
book1.enshelf(shelf10);
book2.enshelf(shelf10);
book100.unshelf();
Library.report();
book100.enshelf(shelf1);
Library.report();

