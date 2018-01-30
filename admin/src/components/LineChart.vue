<script>
import { Line } from 'vue-chartjs';
  
export default {
    extends: Line,
    props: {
        chartData: {
            type: Array | Object,
            required: false
        },
        chartLabels: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [ {
                        gridLines: {
                            display: false
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Games per day'
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        renderLineChart: function(){
            this.renderChart({
                labels: this.myLabels,
                datasets: [{
                    label: 'Games',
                    borderColor: '#249EBF',
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    pointBorderColor: '#249EBF',
                    backgroundColor: 'rgba(18, 189, 246, 0.4)',
                    data: this.myData
                }]
            }, this.options)
        }
    },
    computed: {
        myData: function() {
            return this.chartData;
        },
        myLabels: function() {
            return this.chartLabels;
        }
    },
    watch: {
        chartData: function() {
            this.$data._chart.destroy();
            this.renderLineChart();
        }
    },
    mounted () {
        this.renderLineChart();
    }
}
</script>