function calculateROAS() {
    let adSpend = parseFloat(document.getElementById('adSpend').value);
    let revenue = parseFloat(document.getElementById('revenue').value);
    let cpc = parseFloat(document.getElementById('cpc').value);
    let conversionRate = parseFloat(document.getElementById('conversionRate').value);
    let avgOrderValue = parseFloat(document.getElementById('avgOrderValue').value);

    if (isNaN(adSpend) || isNaN(revenue) || isNaN(cpc) || isNaN(conversionRate) || isNaN(avgOrderValue)) {
        alert('Please fill in all fields');
        return;
    }

    let roas = (revenue / adSpend).toFixed(2);
    let profitMargin = (((revenue - adSpend) / revenue) * 100).toFixed(2);
    let breakEvenROAS = (adSpend / (avgOrderValue * (conversionRate / 100))).toFixed(2);

    document.getElementById('roasResult').innerText = roas;
    document.getElementById('profitMargin').innerText = profitMargin + '%';
    document.getElementById('breakEven').innerText = breakEvenROAS;

    document.getElementById('roasProgress').style.width = Math.min(roas * 10, 100) + '%';
    document.getElementById('profitProgress').style.width = Math.min(profitMargin, 100) + '%';

    updateChart(roas, profitMargin, breakEvenROAS);
}

function updateChart(roas, profitMargin, breakEvenROAS) {
    let ctx = document.getElementById('roasChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ROAS', 'Profit Margin', 'Break-even ROAS'],
            datasets: [{
                label: 'Metrics',
                data: [roas, profitMargin, breakEvenROAS],
                backgroundColor: ['#01458E', '#FFD700', '#FF6347'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
