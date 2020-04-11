//https://docs.google.com/spreadsheets/d/1u-4dTfJfFqf_PJLer_nN2hkPjmiIDtWenHHvVwnG9Z8/edit?ts=5e917eba#gid=0
//https://docs.google.com/spreadsheets/d/1Y7N4lq5u0mCZ59RbWM9L2iDr9-jQfO111r0JhCvmw_g/edit?ts=5e917f30#gid=0

$(function(){

  var $email = $('#email');
  var $result = $('#result');

  $('#button').on('click',function() {
    var email ={
      "address" :$email.val()
    }
    $result.html("");
    const school_catogary = new SteinStore(
        "https://api.steinhq.com/v1/storages/5e9187a8b88d3d04ae0816f3"
      );

    const open_catogary = new SteinStore(
        "https://api.steinhq.com/v1/storages/5e918916b88d3d04ae0816f5"
    );
    console.log(email);
    school_catogary.read("Sheet1", { search: { Email: email["address"] } }).then(data => {
        if(!(data[0] == undefined) && !(data[0]["Marks"]==undefined)){
          console.log(data[0]["Marks"]);
          $result.append('<li>Name:- '+data[0]["Name"]+
                        '<br>Email :- '+email["address"]+
                        '<br>Catogary :- School Category'+
                        '<br>School :- ' + data[0]["School"]+
                        '<br> Results :- ' + data[0]["Marks"]
                        + '</li>' );

        }else if (!(data[0] == undefined) && (data[0]["Marks"]==undefined)) {
          $result.append('<p>There is an error please contact us.</p>');
        }else{
          open_catogary.read("Sheet1", { search: { Email: email["address"] } }).then(data0 => {
              if(!(data0[0]["Marks"]==undefined)){
                $result.append('<li>Name:- '+data0[0]["Name"]+
                              '<br>Email :- '+email["address"]+
                              '<br>Catogary :- Open Catogary'+
                              '<br> Results :- ' + data0[0]["Marks"]
                              + '</li>' );
              }else if (!(data0[0] == undefined) && (data0[0]["Marks"]==undefined)) {
                $result.append('<p>There is an error please contact us.</p>');

              }else {
                $result.append('<p>There is an error please contact us.</p>');
              }
            });
      }
    });
  });
});
