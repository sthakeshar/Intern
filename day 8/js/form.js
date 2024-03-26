$(function(){
    
    $('#btnSubmit').off('click').on('click',function(){
        let name=$('#txtName').val();
        let email=$('#txtEmail').val();
        let password=$('#txtPass').val();
        let gender=$("input[name='gender']:checked").val();
        let phone=$('#txtPhone').val();
        let dob=$('#txtDate').val();
        let faculty=$('#slcFaculty').val();
        
        
        let intr=[];
        $("input[name='interest']:checked").each(function(){
            intr.push($(this).val());
        })


        console.log(name,email,password,phone,dob,gender,faculty);
        console.log("interst: " + intr);
    });
    // $('#btnCancel').off('click').on('click',function(){
    //     $('#table').reset();
    // });

});