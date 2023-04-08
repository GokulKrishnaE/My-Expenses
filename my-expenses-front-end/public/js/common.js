// $(document).ready( function () {


//   let includes = $('[data-include]')
//   jQuery.each(includes, function(){
//     let html = '/' + $(this).data('include') + '.html'
//     $(this).load(html)
//   })

//   $('#historyTable').DataTable(
//       {
//           paging: false
//       }
//   );


//   function initChart(canvasId,chartType,chartLabels,chartBgcolor,chartData,chartOptions){
//     const ctx = $("#" + canvasId);
//       const myChart = new Chart(ctx, {
//       type: chartType,
//       data: {
//           labels: chartLabels,
//           datasets: [{
//               label: '# of Votes',
//               data: chartData,
//               backgroundColor: chartBgcolor
//           }]
//       },
//       options: chartOptions
//     });
//   }


//   let chartLabels = ["food","travel","accomodation","others"],
//   chartBgcolor = ["#5656ff","#56b1ff","#56ff92","#ffb714"],
//   chartData = ["66000","13000","5800","10000"],
//   chartOptions = {
//     scales: {
//       x: {
//         ticks: {
//           display: false,
//         }
//       },
//       y: {
//         ticks: {
//           display: false,
//         }
//       }
//     },
//     plugins: {
//       legend: {
//         display:false
//       },
//       tooltip: {
//         enabled: false
//       },
//     },
//     cutout: 100,
//     tooltips: false,
//   }

//   initChart(
//     "overviewBarchart",
//     "bar",
//     chartLabels,
//     chartBgcolor,
//     chartData,
//     chartOptions
//   )
  
//   initChart(
//     "overviewChart",
//     "doughnut",
//     chartLabels,
//     chartBgcolor,
//     chartData,
//     chartOptions
//   )
//   initChart(
//     "tripPagechart",
//     "bar",
//     chartLabels,
//     chartBgcolor,
//     chartData,
//     chartOptions
//   )
      
// } );
// $(document).ajaxStop(function(){

//     let url = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
//     $('.mainMenu li').each(function(){
//       let path = $(this).find('a').attr('href')
//       if(url == path){
//         $('.mainMenu li').removeClass('active')
//         $(this).addClass('active')
//       }
//     })
  
// })
