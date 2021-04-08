$('.chartfill').css({height:$('.chartfill').width()}) 
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom, 'dark');
var option;

var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}


option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: 'Financial',
    },
    toolbox: {
        feature: {
            /*dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},*/
            saveAsImage: {}
        }
    },
    grid: {
       left: '15px',
       right: '15px'
    },
    xAxis: {
    	show:false, 
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
    	show:false, 
        type: 'value',
        boundaryGap: [0, '100%']
    },
    /*
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10
    }],*/
    series: [
        {
            name: 'Value',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: data
        }
    ]
};

function nextBar(date, lastClose) {
	var open = lastClose
	var close = (lastClose * (1 + interest)) + payment
	return {
		x: date.valueOf(),
		y: close,
		t: date.valueOf(),
		o: open,
		h: open,
		l: close,
		c: close
	};

}

function compoundData(dateStr, count) {
	var date = luxon.DateTime.fromRFC2822(dateStr);
	var data = [nextBar(date, principal)];
	while (data.length < count) {
		date = date.plus({years: 1});
		data.push(nextBar(date, data[data.length - 1].c));
		
	}
	return data;
}

option && myChart.setOption(option);
