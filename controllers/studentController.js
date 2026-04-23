import Student from "../models/student.js";

export function createStudent (req,res){


    if(req.user == null){
        res.json({
            massage : " login before create student"
        })
        return
    }

    if(!req.user.isAdmin){
        req.json({
            massage: "only admin can create user"
        }) 

    return
    }
    const newStudent = new Student({
        name: req.body.name,
        age : req.body.age,
        city : req.body.city
    });


 newStudent.save().then(()=>{
    res.json({
        message : " student create success"
    });
 }).catch((erro)=>{
    console.error("Error creating student:",error);
 }); 
    

} 
export async function createStudentAsync(req,res){
 

}

 


export function getStudents (req,res){

    Student.find().then(

        (students)=>{

            res.json(students)

        }

    )
}