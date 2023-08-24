document.addEventListener('alpine:init', () => {

    Alpine.data('TaxiQueue', () => {

        return {
            version: 'api-1.0',
            queueLength: 0,
            taxiQueueLength: 0,

            init() {
                this.updateQueueLength();
                this.updateTaxiQueueLength();
            },

            updateQueueLength() {
                axios
                    .get('/api/passenger/queue')
                    .then(result => {
                        this.queueLength = result.data.queueCount;
                    });
            },

            updateTaxiQueueLength() {
                axios
                    .get('/api/taxi/queue')
                    .then(result => {
                        this.taxiQueueLength = result.data.queueCount;
                    });
            },

            joinQueue() {
                axios
                    .post('/api/passenger/join')
                    .then(response => {
                        this.updateQueueLength();
                    });
            },

            leaveQueue() {
                axios
                    .post('/api/passenger/leave')
                    .then(response => {
                        this.updateQueueLength();
                    });
            },

            joinTaxiQueue() {
                axios
                    .post('/api/taxi/join')
                    .then(response => {
                        this.updateTaxiQueueLength();
                    });
            },
            taxiDepart() {
    axios
        .post('/api/taxi/depart')
        .then(response => {
            if (response.status === 200) {
                const passengerCount = this.queueLength;
                if (passengerCount >= 12) {
                    this.updateTaxiQueueLength();
                    this.updateQueueLength(); // Reset passenger count
                } else {
                    console.error('Not enough passengers for taxi departure');
                }
            } else {
                console.error('Taxi departure failed');
            }
        })
        .catch(error => {
            console.error('An error occurred during taxi departure:', error);
        });
}
            
			
        }
    });

});
