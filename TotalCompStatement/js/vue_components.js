function groupBy(array, key) {
    const result = {}
    array.forEach(item => {
        if (!result[item[key]]) {
            result[item[key]] = []
        }
        result[item[key]].push(item)
    })
    return result
};
var CompFormInput = new Vue({
    el: '#totCompForm',
    data: {
        compLocality: [],
        compClasses: [],
        compStatus: [],
        compRetirement: [],
        compContributions: [],
        selectedRetirement: '-1',
        selClass: 'I',
        compStatusSel: '',
        formInputVal: []

    },
    methods: {
        pushFormVals: function () {
            var firstName = $.trim($('#firstNameInput').val());
            var middleInitial = $.trim($('#middleNameInput').val());
            var lastName = $.trim($('#lastNameInput').val());
            var emailAddr = $.trim($('#emailEntry').val());
            var baseSal = $.trim($('#currency-field').val());
            var localitySel = $.trim($('#localityDrop').children('option:selected').text());
            this.formInputVal.push({
                "first_name": firstName,
                "middle_initial": middleInitial,
                "last_name": lastName,
                "email_addr": emailAddr,
                "base_salary": baseSal,
                "locality":localitySel,
                "selected_ret_code":this.selectedRetirement,
                "selected_class":this.selClass
            });
        },
        
        changeRetPlan: function () {
            self = this;
            CompBreakdown.compRetPlans[0].Plan_Type = self.selectedRetirement;
            CompBreakdown.compRetPlansSel = self.compRetirement.filter(function (n) {
                return n.PLAN == self.selectedRetirement;
            });
            CompBreakdown.compRetPlans[0].agency_cont_level = CompBreakdown.compRetPlansSel[0].ER_BWK_CONT_PERC;

        },

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
                url: "/web_projects/MyEnrollWebService/CommonWebMethod.aspx/GetClassCode",
                data: JSON.stringify({}),
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    self.compClasses = JSON.parse(data.d);
                },
                error: function () {
                    console.log("error in CommonWebMethod.aspx/GetClassCode service");
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

            $('#submit').removeClass('uk-hidden');
            var today = new Date();
            var ampm = today.getHours() >= 12 ? 'pm' : 'am';
            var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
            var time = ((today.getHours() + 24) % 12 || 12) + ":" + today.getMinutes();
            var dateTime = date + ' - ' + time + ' ' + ampm;
            var fName = $.trim($('#firstNameInput').val());
            var lName = $.trim($('#lastNameInput').val());
            var emailP = $.trim($('input[type=email]').val());
            var status = $('input[name="statusSel"]:checked').val();
            var localitySel = $('#localityDrop').children('option:selected').text();
            var retirementSel = $('#retirementDrop').children('option:selected').val();
            var classSel = $('#classDrop').children('option:selected').val();
            var emptyItems = [];
            var emptyItemsNew = '';
            this.state = 'test';
            var emptyItemsInp = '';
            var emptyItemsRad = '';
            var emptyItemsSel = '';


            emptyItemsInp = $('.required').filter(function () {
                return this.value == "";
            }).prev().map(function () {
                return '<i class="fad fa-times-circle uk-text-danger"></i>  ' + $.trim($(this).text()) + '</br>';
            }).get();

            // var emptyItemsEma = $('input[type="email"].required').filter(function() { return this.value.indexOf("@") == -1; }).prev().map(function () {
            //     return '<i class="fad fa-times-circle uk-text-danger"></i>  ' + $.trim($(this).text()) + '</br>';
            // }).get();


            emptyItemsRad = $('input:radio').not(":checked").parent().prev().children('.uk-form-label').map(function () {
                return '<i class="fad fa-times-circle uk-text-danger"></i>  ' + $.trim($(this).text()) + '</br>';
            }).get();


            emptyItemsSel = $('select').filter(function () {
                return $.trim($(this).val()).length == 0;
            }).prev().map(function () {
                return '<i class="fad fa-times-circle uk-text-danger"></i>  ' + $.trim($(this).text()) + '</br>';
            }).get();




            if (fName == "" || lName == "" || emailP == "" || status == null || localitySel == -1 || retirementSel == -1 || classSel == -1 || $('#totCompForm .uk-form-danger').length > 0 || $('#emailEntry').val() != $('#confirmEmailEntry').val()) {

                $('#alertArea').html('');
                if ($('#emailEntry').val() != $('#confirmEmailEntry').val()) {
                    emptyItems.push('<i class="fad fa-times-circle uk-text-danger"></i>  Matching Email Addresses</br>');
                    $('#alertArea').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Emails do not match.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                }
                emptyItems.push(emptyItemsInp, emptyItemsRad, emptyItemsSel);
                emptyItemsNew = emptyItems.toString().split(",").join("");
                UIkit.modal.alert('<div class="uk-text-large uk-text-primary">Oops!</div><div class="uk-margin">It looks like you missed some required fields. Make sure to fill in the below fields.</div><div>' + emptyItemsNew + '</div>').then(function () {
                    console.log('Alert closed.')
                });

                $('.required').filter(function () {
                    return this.value == "";
                }).each(function () {

                    $(this).addClass('me-validate2 uk-form-danger');
                });
                $('select.required').filter(function () {
                    return this.value == "-1";
                }).each(function () {

                    $(this).addClass('me-validate2 uk-form-danger');
                });
                // $('input:radio').not(':checked').each(function(e) {
                //     $(this).siblings('label').addClass('me-validate2 uk-form-danger');
                // })

            } else {
                $('.alert-danger').alert('close');
                CompBreakdown.calcComp();
                UIkit.accordion('#totalCompAccord').toggle(0);
                UIkit.accordion('#totalCompAccord').toggle(1);
                $('.me-name-hdr').text(fName + " " + lName);
                $('#emailInput').text(emailP);
                $('#statusColl').text(status);
                $('#viewedTs').text(dateTime);
                $('#localityColl').text(localitySel);
                $('#retirementColl').text(retirementSel);
                $('#classColl').text(classSel);
                $('#compDetailsSect').removeClass('uk-disabled');
                $('html,body').animate({
                    scrollTop: $("#compDetailsSect").offset().top - 20
                });
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
        compChoices: [],
        compChoicesSel: [],
        eeCostTotal: '',
        erCostTotal: '',
        costArray: [],
        emptyData: false,
        agencyCont: '',
        eeCostCal: '',
        compFedBen: [],
        compRetBen: [],
        compSSVar: '',
        compMedVar: '',
        compTotalPays: '',
        salaryCollect: 90500,
        InsuranceVal: '',
        lifeRate: [],
        lifeEEcont: '',
        lifeERcont: '',
        lifeTotalcont: '',
        fedSS: '',
        fedMed: '',
        FedBenVal: '',
        compRetPlans: [],
        compRetPlansSel: [],
        fringeBenefits: [],

        ChartLabels: ['Insurance Benefits', 'Social Security', 'Medicare']
    },
    computed: {
        grouping() {
            return groupBy(this.compChoices, 'Plan')
        }

    },
    methods: {
        loadRetirementPlans: function () {
            self = this;
            $.ajax({
                type: "GET",
                url: "./data/retirementPlans.json",
                data: JSON.stringify({}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                    self.compRetPlans = data;
                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            });
        },
        loadVariables: function () {
            self = this;
            $.getJSON('./data/variables.json', function (data) {
                self.compSSVar = data.social_security_rate;
                self.compMedVar = data.medicare_rate;
                self.compTotalPays = data.total_pays;

            });

        },
        formatPrice(value) {

            let val = '$' + (value / 1).toFixed(2).replace(',', '.')
            if (val == '$999999.00') {
                return "";
            } else {
                return val.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

        },
        pushTotalIns: function () {
            self = this;
            self.compContributions.push({
                "Tier_ID": null,
                "Plan_ID": null,
                "Plan": "Total",
                "Option": null,
                "Tier": null,
                "ee_cost": 999999,
                "er_cost": self.InsuranceVal.toFixed(2),
                "total_cost": 999999,
                "default": null,
                "sort_order": null
            });
        },

        loadFedBen: function () {
            var self = this;
            var baseSal = self.salaryCollect;
            var baseSalCv = (baseSal < 137700) ? baseSal : 137700;
            self.fedSS = (baseSalCv * self.compSSVar) / self.compTotalPays;
            self.fedMed = (baseSalCv * self.compMedVar) / self.compTotalPays;
            self.compFedBen = [];
            self.compFedBen.push({
                'Fed_Ben': 'Social Security',
                'Fed_Val': self.fedSS
            }, {
                'Fed_Ben': 'Medicare',
                'Fed_Val': self.fedMed
            });



            setTimeout(function () {
                self.costArray = [];
                chartAct.reset();
                self.costArray.push(Math.ceil((self.InsuranceVal) * 100 / 100), Math.ceil((self.fedSS) * 100 / 100), Math.ceil((self.fedMed) * 100 / 100));
                self.pushTotalIns();
                self.pushTotalFedBen();

            }, 1);


            self.loadLifeInfo();

            chartAct.reset();
        },
        pushTotalFedBen: function () {
            self.compFedBen.push({
                'Fed_Ben': 'Total',
                'Fed_Val': self.fedSS + self.fedMed
            });
            self.FedBenVal = self.fedSS + self.fedMed;
            self.agencyCont = (self.InsuranceVal + self.FedBenVal);
            var totalCompensation = Number($('#currency-field').val()) + self.agencyCont;
            $('#agencyCont').text('$' + parseFloat(self.agencyCont, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
            $('#basePayColl').text('$' + parseFloat($('#currency-field').val()).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
            $('#totalComp').text('$' + parseFloat(totalCompensation, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
        },
        loadFringeBen: function () {
            $.getJSON('./data/fringeBen.json', function (data) {
                self.fringeBenefits = data;
            })
        },
        loadLifeInfo: function () {
            self = this;
            $.ajax({
                type: "GET",
                url: "./data/lifeRates.json",
                data: JSON.stringify({}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.lifeRate = data.filter(function (n) {
                        return n.Plan_ID == self.compContributions[self.compContributions.length - 2].Plan_ID;
                    });
                    self.lifeEEcont = self.lifeRate[0].ee_rate;
                    self.lifeERcont = self.lifeRate[0].er_rate;


                    var series_total_cost = [];

                    $.each(CompBreakdown.compContributions, function (key, value) {
                        var Z = value.total_cost;
                        series_total_cost.push(Z);
                    });
                    var total_cost = series_total_cost.reduce(function (sum, d) {
                        return sum + d
                    });
                    self.compContributions[self.compContributions.length - 2].Tier = ('$' + parseFloat(Math.round(self.salaryCollect / 1000) * 1000, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
                    self.compContributions[self.compContributions.length - 2].ee_cost = Math.ceil(((self.salaryCollect / 1000) * self.lifeEEcont) * 100) / 100;
                    self.compContributions[self.compContributions.length - 2].er_cost = Math.ceil(((self.salaryCollect / 1000) * self.lifeERcont) * 100) / 100;
                    self.compContributions[self.compContributions.length - 2].total_cost = Math.ceil(((self.compContributions[self.compContributions.length - 1].ee_cost) + (self.compContributions[self.compContributions.length - 1].er_cost)) * 100) / 100;
                    CompBreakdown.InsuranceVal = Number(total_cost);


                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            });


        },

        loadLifeRates: function () {
            var self = this;
            $.getJSON('./data/lifeRates.json', function (data) {

                self.lifeRate = data.filter(function (n) {
                    return n.Plan_ID == self.compContributions[self.compContributions.length - 2].Plan_ID;
                });

            });
        },
        clearReset: function () {
            $('.uk-dropdown input[type="radio"]').prop('checked', false);
            CompBreakdown.compContributions = [];
            CompBreakdown.costArray = [];
            setTimeout(function () {
                chartAct.reset();
            }, 250);
            UIkit.notification({
                message: 'Selections Cleared',
                status: 'primary',
                pos: 'top-right',
                timeout: 3000
            });
            $('#chartArea, #ratesTable').addClass('uk-hidden');
            $('#noData').removeClass('uk-hidden');
        },
        calcComp: function () {
            var self = this;

            self.loadDefault();
        },
        loadChoices: function () {
            var self = this;
            self.compChoices = [];
            $.ajax({
                type: "POST",
                url: "/web_projects/MyEnrollWebService/CommonWebMethod.aspx/GetCompenstation",
                data: JSON.stringify({
                    class_code: CompFormInput.selClass
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var selData = JSON.parse(data.d);
                    self.compChoices = selData;
                    var defaultPlans = [];
                    self.compChoicesSel = selData.filter(function (n) {
                        return n.default == "true";
                    });
                    $.each(self.compChoicesSel, function (key, value) {
                        var X = value.Plan_ID;
                        var Y = value.Tier_ID;
                        defaultPlans.push(X + Y)
                    });
                    self.compChoicesSel = defaultPlans;

                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            });
        },


        loadContributions: function () {
            var self = this;
            self.compContributions = [];
            self.costArray = [];

            $.ajax({
                type: "POST",
                url: "/web_projects/MyEnrollWebService/CommonWebMethod.aspx/GetCompenstation",
                data: JSON.stringify({
                    class_code: CompFormInput.selClass
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var contData = JSON.parse(data.d);
                    self.compChoices = contData;
                    self.compContributions = contData.filter(function (n) {
                        return $.inArray(n.Plan_ID + n.Tier_ID, self.compChoicesSel) >= 0
                    });


                    var series_data_arrX = [];
                    var series_data_arrY = [];
                    var series_cost_array = [];
                    var series_total_cost = [];

                    $.each(self.compContributions, function (key, value) {
                        var X = value.ee_cost;
                        var Y = value.er_cost;
                        var Z = value.total_cost;
                        series_data_arrX.push(X);
                        series_data_arrY.push(Y);
                        series_cost_array.push([X, Y]);
                        series_total_cost.push(Z);
                    });




                    var ee_cost_total = series_data_arrX.reduce(function (sum, d) {
                        return sum + d;
                    }, 0);
                    var total_cost = series_total_cost.reduce(function (sum, d) {
                        return sum + d
                    });

                    var er_cost_total = series_data_arrY.reduce(function (sum, d) {
                        return sum + d;
                    }, 0);
                    self.eeCostTotal = ee_cost_total;
                    self.erCostTotal = er_cost_total;
                    self.eeCostCal = ee_cost_total;
                    self.InsuranceVal = Number(total_cost);


                    $.each(self.compChoicesSel, function (index, value) {
                        $('#' + value).prop('checked', true);
                    });




                },
                error: function (data) {
                    // alert("Error: " + data.d);
                    console.log('error');
                }
            }).then(function () {
                self.loadFedBen();
            });
            self.loadLifeInfo();
            UIkit.update(element = document.body, type = 'update');

        },
        loadDefault: function () {
            this.loadContributions();



            $('#chartArea, #ratesTable').removeClass('uk-hidden');
            $('#noData').addClass('uk-hidden');


            setTimeout(function () {
                chartAct.reset();

            }, 250);

        }

    },


    created: function () {
        this.loadVariables();
        this.loadFringeBen();
        this.loadChoices();
        this.loadRetirementPlans();
    }
});
var CompMessageArea = new Vue({
    el: '#messageArea',
    data: {
        compMessage: [],
    },
    methods: {
        loadMessage: function () {
            self = this;
            $.getJSON('./data/variables.json', function (data) {
                self.compMessage = data.message;

            });

        },
    }
});