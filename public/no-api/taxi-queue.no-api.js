document.addEventListener('alpine:init', () => {

    Alpine.data('TaxiQueue', () => {

        return {
            version: 'no-api-1.0',
            passengerQueueCount: 0,
            taxiQueueCount: 0,

            joinQueue() {
                this.passengerQueueCount++;
            },
            init() {
                alert('Welcome to taxi app')
            },
            leaveQueue() {
                if (this.passengerQueueCount > 0) {
                    this.passengerQueueCount--;
                }

            },

            joinTaxiQueue() {

                this.taxiQueueCount++;

            },

            queueLength() {
                const leave = this.leaveQueue() - 1;

            },
            taxiQueueLength() {

            },
            taxiDepart() {
                // Implement logic for taxi departure here
                if (this.taxiQueueCount > 0) {
                    this.taxiQueueCount--;
                    if (this.passengerQueueCount >= 12) { this.passengerQueueCount = 0; }
                }
            }

        }

    });

});