export default function Styles() {
  return (
    <style type="text/css">
      {`
                .modal-dialog{
                  max-width: 450px          
                }

                .btn-warning{
                  color: #F6F9F9;
                }
                .btn-warning:hover{
                  color: #F6F9F9;
                }
                .btn-warning:focus{
                  color: #F6F9F9;
                  box-shadow: none;
                }

                .btn-outline-warning{
                  border-color: #F4B271;
                  color: #F4B271;
                }
                .btn-outline-warning:hover{
                  color: #F6F9F9;
                  background-color: #F4B271;
                  border-color: #F4B271;
                }
                .btn-outline-warning:focus{
                  box-shadow: none
                }
                .btn-outline-warning:checked{
                  box-shadow: none
                }

                .form-control:focus{
                  box-shadow: none;
                }

                .input-group span{
                  border-radius: 25x;
                }
                .input-group input{
                  border-radius: 25px;
                }
                .input-group button{
                  border-radius: 25px;
                  border-left: none;
                  border-color: rgb(206, 212, 218);
                  background-color: #fff;
                }
                .input-group input[type="password"]{
                  border-right: none;
                }
                .input-group input[type="text"]{
                  border-right: none;
                }
                .input-group input::-webkit-input-placeholder {
                  color: #CCCCCC;
                }
                .input-group .form-control:focus + .AUTH-BTN,
                .input-group .form-control:focus{
                  border-color: #F4B271;
                }

                .AUTH-BTN{
                  border-top: 1px solid;
                  border-right: 1px solid;
                  border-bottom: 1px solid;
                  color: #CCCCCC;
                  padding: 5px 10px;
                  padding-bottom: 8px;
                }

                .reg .input-group{
                  height: 50px;
                }
                .reg .input-group .is-invalid,
                .reg .input-group .is-valid
                {
                  box-shadow: none;
                }
                .reg .input-group .is-invalid,
                .reg .input-group .is-invalid + .AUTH-BTN{
                  border-color: red;
                }
                .reg .input-group .is-valid,
                .reg .input-group .is-valid + .AUTH-BTN{
                  border-color: green;
                }


            `}
    </style>
  );
}
