var CompFormInput = new Vue({
    el: '#totCompForm',
    data: {
        compLocality: [],
        compClasses: [],
        compStatus: [],
        compRetirement: [],
        compContributions: []
    },
    methods: {

        loadLocality: function () {
            var self = this;
            $.ajax({
                type: "GET",
                url: "./data/locality.json",
                data: JSON.stringify({}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.compLocality = data;

                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            });
        },
        loadClasses: function () {
            var self = this;
            $.ajax({
                type: "GET",
                url: "./data/classes.json",
                data: JSON.stringify({}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.compClasses = data;
                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            });
        },
        loadStatus: function () {
            var self = this;
            $.ajax({
                type: "GET",
                url: "./data/status.json",
                data: JSON.stringify({}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.compStatus = data;
                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            });
        },
        loadRetirement: function () {
            var self = this;
            $.ajax({
                type: "GET",
                url: "./data/retirement.json",
                data: JSON.stringify({}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.compRetirement = data;
                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            });
        },
        runReport: function () {
            var fName = $.trim($('#firstNameInput').val());
            var mName = $.trim($('#middleNameInput').val());
            var lName = $.trim($('#lastNameInput').val());
            var emailP = $.trim($('input[type=email]').val());
            var status = $('input[name="statusSel"]:checked').val();
            var localitySel = $('#localityDrop').children('option:selected').text();
            var retirementSel = $('#retirementDrop').children('option:selected').text();
            var classSel = $('#classDrop').children('option:selected').text();
            this.state = 'test';
            if (fName == "" || lName == "" || emailP == "" || status == null || localitySel == null || retirementSel == null || classSel == null) {
                UIkit.modal.alert('<div class="uk-text-large uk-text-primary">Oops!</div><div class="uk-margin">It looks like you missed some required fields. Make sure to fill in the below fields.</div><div><ul class="uk-list me-list-pop"><li>First Name</li><li>Last Name</li><li>Email Address</li><li>Base Salary</li><li>Status</li><li>Locality</li><li>Retirement Plan</li><li>Benefits Class</li></ul></div>').then(function () {
                    console.log('Alert closed.')
                });
            } else {
                CompBreakdown.calcComp();
                UIkit.accordion('#totalCompAccord').toggle(0);
                UIkit.accordion('#totalCompAccord').toggle(1);
                $('.me-name-hdr').text(fName + " " + lName);
                $('#emailInput').text(emailP);
                $('#statusColl').text(status);
                $('#localityColl').text(localitySel);
                $('#retirementColl').text(retirementSel);
                $('#classColl').text(classSel);
                $('#compDetailsSect').removeClass('uk-disabled');
            }

        }
    },
    created: function () {
        this.loadLocality();
        this.loadClasses();
        this.loadStatus();
        this.loadRetirement();
    },
});


var CompBreakdown = new Vue({
    el: '#breakdownArea',
    data: {
        state: 'Self Only',
        compContributions: [],
        eeCostTotal: [],
        erCostTotal: [],
        costArray: [],
        agencyCont: '',
        eeCostCal: ''
    },
    methods: {
        calcComp: function () {
            var self = this;
            
            var currColl = $('#currency-field').val();
            var baseSal = Number(currColl.replace(/[^0-9.-]+/g,""));
            self.agencyCont  = (Number(currColl.replace(/[^0-9.-]+/g,"")) * .065) +  self.eeCostCal;
            var totalCompensation = baseSal + self.agencyCont;

            $('#agencyCont').text('$' + parseFloat(self.agencyCont, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
            $('#basePayColl').text(currColl);
            $('#totalComp').text('$' + parseFloat(totalCompensation, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
        },
        familySwitch: function () {
            self =  this;
            
            var tableHeight = $('#ratesTable').height();
            $('#ratesTable').height(tableHeight);
            if (this.state == "Self Only") {
                this.state = "Family";
                this.loadContributions();
            } else {
                this.state = "Self Only";
                this.loadContributions();
            }
            
            chartAct.reset();
            setTimeout(function () {
                $('#ratesTable').height('auto');
            }, 150);
            
            


        },
        loadContributions: function () {
            var self = this;
            self.compContributions = [];
            self.costArray = [];
            if (this.state == "Family") {
                $.ajax({
                    type: "GET",
                    url: "./data/contributions.json",
                    data: JSON.stringify({}),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.compContributions = data.filter(function (n) {
                            return n.Tier === 'Self and Family'
                        });
                        var series_data_arrX = [];
                        var series_data_arrY = [];
                        var series_cost_array = [];

                        $.each(self.compContributions, function (key, value) {
                            var X = value.ee_cost;
                            var Y = value.er_cost;
                            series_data_arrX.push(X);
                            series_data_arrY.push(Y);
                            series_cost_array.push([X, Y]);
                        });


                        var ee_cost_total = series_data_arrX.reduce(function (sum, d) {
                            return sum + d;
                        }, 0);

                        var er_cost_total = series_data_arrY.reduce(function (sum, d) {
                            return sum + d;
                        }, 0);
                        var costArray = [];
                        self.eeCostTotal.push(ee_cost_total);
                        self.erCostTotal.push(er_cost_total);
                        self.eeCostCal = ee_cost_total;


                        self.costArray.push(ee_cost_total, er_cost_total)

                    },
                    error: function (data) {
                        // alert("Error: " + data.d);
                        console.log('error');
                    }
                });
            } else {
                $.ajax({
                    type: "GET",
                    url: "./data/contributions.json",
                    data: JSON.stringify({}),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        self.compContributions = data.filter(function (n) {
                            return n.Tier === 'Self Only'
                        });
                        var series_data_arrX = [];
                        var series_data_arrY = [];
                        var series_cost_array = [];

                        $.each(self.compContributions, function (key, value) {
                            var X = value.ee_cost;
                            var Y = value.er_cost;
                            series_data_arrX.push(X);
                            series_data_arrY.push(Y);
                            series_cost_array.push([X, Y]);
                        });


                        var ee_cost_total = series_data_arrX.reduce(function (sum, d) {
                            return sum + d;
                        }, 0);

                        var er_cost_total = series_data_arrY.reduce(function (sum, d) {
                            return sum + d;
                        }, 0);
                        var costArray = [];
                        self.eeCostTotal.push(ee_cost_total);
                        self.erCostTotal.push(er_cost_total);
                        self.eeCostCal = ee_cost_total;

                        self.costArray.push(ee_cost_total, er_cost_total)

                    },
                    error: function (data) {
                        // alert("Error: " + data.d);
                        console.log('error');
                    }
                });
            }
            UIkit.update(element = document.body, type = 'update');
        }

    },

    created: function () {
        this.loadContributions();

    },
});