var dbModule = new function() {
	const customerData = [
	{ ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
	{ ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }];
	
	var self = this;
	
	var db, request;
	
	var request = window.indexedDB.open("amlich", 2);		
	
	request.onerror = function(event) {
		//alert("Database error: " + event.target.errorCode);
	};
	
	request.onsuccess = function(event) {
		alert("Opened sucessfully.");
		var db = event.target.result;
	};
	
	request.onupgradeneeded = function(event) {
		var db = event.target.result;

		// Create an objectStore to hold information about our customers. We're
		// going to use "ssn" as our key path because it's guaranteed to be
		// unique - or at least that's what I was told during the kickoff meeting.
		var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

		// Create an index to search customers by name. We may have duplicates
		// so we can't use a unique index.
		objectStore.createIndex("name", "name", { unique: false });

		// Create an index to search customers by email. We want to ensure that
		// no two customers have the same email, so use a unique index.
		objectStore.createIndex("email", "email", { unique: true });

		// Use transaction oncomplete to make sure the objectStore creation is 
		// finished before adding data into it.
		objectStore.transaction.oncomplete = function(event) {
		// Store values in the newly created objectStore.
			var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
			customerData.forEach(function(customer) {
			customerObjectStore.add(customer);
			});
		};
		alert("ASAS");
	};
};