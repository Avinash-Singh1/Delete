const mysql= require('mysql');


// database connection pool

const pool =mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});


// view user
exports.view=(req,res)=>{

    //  CONNECT TO db
        pool.getConnection((err,connection)=>{
            if(err) throw err;


            console.log('Connected as ID '+ connection.threadId);
            
            //   user the connection 
            connection.query('SELECT * FROM user WHERE status="active" ',(err,rows)=>{

                //when done with connection realease it
                connection.release();

                if(!err)
                {
                    let removedUser= req.query.removed;
                    res.render('home',{rows,removedUser});
                }else{
                    console.log(err);
                }

                console.log('The data from the user table:\n',rows);
            });
        });


}


// find user by search
exports.find=(req,res)=>{
     //  CONNECT TO db 

     pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID '+ connection.threadId);
        
        let searchItem =req.body.search;

        //   user the connection 
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name  LIKE ?', ['%'+searchItem+'%', '%'+searchItem+'%'],(err,rows)=>{

            //when done with connection realease it
            connection.release();

            if(!err)
            {
                res.render('home',{rows});
            }else{
                console.log(err);
            }

            console.log('The data from the user table:\n',rows);
        });
    });


}

// find user by search
exports.form=(req,res)=>{
      
   
  res.render('add-user');

}

// create data and insert into databases
exports.create=(req,res)=>{
      
    const {first_name,last_name,email,phone,comments} = req.body;
      
     pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID '+ connection.threadId);
        
        let searchItem =req.body.search;

        //   user the connection 
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?,email=?,phone=?,comments=?',[first_name,last_name,email,phone,comments],(err,rows)=>{

            //when done with connection realease it
            connection.release();

            if(!err)
            {
                res.render('add-user',{alert : 'user added successfully'});

            }else{
                console.log(err);
            }

            console.log('The data from the user table:\n',rows);
        });
    });
}

 
// edit user 
exports.edit = (req,res)=>{

    // res.render('edit-user');

      //  CONNECT TO db
      pool.getConnection((err,connection)=>{
        if(err) throw err;


        console.log('Connected as ID '+ connection.threadId);
        
        //   user the connection 
        connection.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{

            //when done with connection realease it
            connection.release();
 
            if(!err)
            {
                res.render('edit-user',{rows});
            }else{
                console.log(err);
            }

            console.log('The data from the user table:\n',rows);
        });
    });
}


// update user 

exports.update = (req,res)=>{
    const {first_name,last_name,email,phone,comments} = req.body;
    
    // res.render('edit-user');
      //  CONNECT TO db
      pool.getConnection((err,connection)=>{
        if(err) throw err; //not connected !
        console.log('Connected as ID '+ connection.threadId);
        //   user the connection 
        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ? ,phone = ?, comments = ?, WHERE id= ?',[first_name,last_name,email,phone,comments,req.params.id],(err,rows)=>{

            //when done with connection realease it
            connection.release();
 
            if(!err)
            {
                // res.render('edit-user');
                //  CONNECT TO db
                pool.getConnection((err,connection)=>{
                    if(err) throw err;

                    console.log('Connected as ID '+ connection.threadId);
                    //   user the connection 
                    connection.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{
                        //when done with connection realease it
                        connection.release();
                        if(!err)
                        {
                            res.render('edit-user',{rows, alert: `${first_name}`});
                        }else{
                            console.log(err);
                        }
                        console.log('The data from the user table:\n',rows);
                    });
                });
                
            }else{
                console.log(err);
            }

            console.log('The data from the user table:\n',rows);
        });
    });
}
 



// delete user 
exports.delete = (req,res)=>{

    // res.render('edit-user');

      //  CONNECT TO db
      pool.getConnection((err,connection)=>{
        if(err) throw err;


        console.log('Connected as ID '+ connection.threadId);
        
        //   user the connection 
        connection.query('DELETE  FROM user WHERE id=?',[req.params.id],(err,rows)=>{

            //when done with connection realease it
            connection.release();
            let removedUser = encodeURIComponent('User successfully removed.');
            if(!err)
            {
                res.redirect('/?removed='+removedUser);
            }else{
                console.log(err);
            }

            console.log('The data from the user table:\n',rows);
        });
    });
}



// delete user 
exports.viewall = (req,res)=>{

    // res.render('edit-user');

      //  CONNECT TO db
      pool.getConnection((err,connection)=>{
        if(err) throw err;


        console.log('Connected as ID '+ connection.threadId);
        
        //   user the connection 
        connection.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{

            //when done with connection realease it
            connection.release();
 
            if(!err)
            {
                res.render('view-user',{rows});
            }else{
                console.log(err);
            }

            console.log('The data from the user table:\n',rows);
        });
    });
}