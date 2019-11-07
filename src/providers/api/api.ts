import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private baseUrl = /*'http://mealcheck.eu/api/';*/'http://localhost:8888/api/';

  constructor(public http: HttpClient) {

  }

  //--------FRIGO------------
  getFrigoByIdUser(idUser) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { id_user: idUser };
    return this.http.post(this.baseUrl + 'frigo/getByIdUser.php', JSON.stringify(dayta), requestOptions);
  }

  getMagasinByIdUser(idUser) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { id_user: idUser };
    return this.http.post(this.baseUrl + 'frigo/getMagasin.php', JSON.stringify(dayta), requestOptions);
  }

  deleteFrigo(userid) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { id_user: userid };

    return this.http.post(this.baseUrl + 'frigo/deleteFrigo.php', JSON.stringify(dayta), requestOptions);
  }

  deleteIng(userid, idING) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid,
      id_ingredient: idING
    };
    return this.http.post(this.baseUrl + 'frigo/delete.php', JSON.stringify(dayta), requestOptions);
  }

  addIngredientToFrigo(userId, ingredientId) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userId,
      id_ingredient: ingredientId
    };
    return this.http.put(this.baseUrl + 'frigo/add.php', JSON.stringify(dayta), requestOptions);
  }
  //-------------------------

  //--------Recette------------
  getLivreByIdUserIdIng(userId, ingredientId) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=utf-8;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userId,
      id_ing: ingredientId
    };
    return this.http.post(this.baseUrl + 'recette/getLivreByIdUserIdIng.php', JSON.stringify(dayta), requestOptions);
  }
  getRecette(recetteId) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { id_recette: recetteId };
    return this.http.post(this.baseUrl + 'recette/getById.php', JSON.stringify(dayta), requestOptions);
  }

  getLivreByIdUser(userId) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=utf-8;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { id_user: userId };
    return this.http.post(this.baseUrl + 'recette/getLivreByIdUser.php', JSON.stringify(dayta), requestOptions);
  }
  //--------------------------- 

  //----------MealPlanner------
  contains(userid, recetteid, moment) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid,
      id_recette: recetteid,
      moment: moment
    };
    return this.http.post(this.baseUrl + 'mealplanner/contains.php', JSON.stringify(dayta), requestOptions);
  }

  deleteRepasMealPlanner(repasid) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_repas: repasid
    };
    return this.http.post(this.baseUrl + 'mealplanner/delete.php', JSON.stringify(dayta), requestOptions);
  }
  addRepas(userid, recetteid, moment) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid,
      id_recette: recetteid,
      moment: moment
    };
    return this.http.post(this.baseUrl + 'mealplanner/add.php', JSON.stringify(dayta), requestOptions);
  }

  getSuivi(userid, date1, date2) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid,
      date1: date1,
      date2: date2
    };
    return this.http.post(this.baseUrl + 'profil/getMealTracerByDate.php', JSON.stringify(dayta), requestOptions);
  }

  getMealTracer(userid, date1, date2) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid,
      date1: date1,
      date2: date2
    };
    return this.http.post(this.baseUrl + 'profil/mealTracer.php', JSON.stringify(dayta), requestOptions);
  }

  getNbOccurenceRep(userid, recetteid) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid,
      id_recette: recetteid,
    };
    return this.http.post(this.baseUrl + 'mealplanner/getCounterRepas.php', JSON.stringify(dayta), requestOptions);
  }

  getAllRepasById(id) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { id_user: id };
    return this.http.post(this.baseUrl + 'mealplanner/getAllRepasByIdUser.php', JSON.stringify(dayta), requestOptions);
  }
  //---------------------------






  getListeCourse(userid, date1, date2) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid,
      date1: date1,
      date2: date2
    };
    return this.http.post(this.baseUrl + 'mealplanner/getListeCourse.php', JSON.stringify(dayta), requestOptions);
  }

  /*

  getFrigo(id){
    var headers = new HttpHeaders();
    headers.append('Content-Type','application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {id_user:id};
    return this.http.post(this.baseUrl+'frigo/getbyID',JSON.stringify(dayta),requestOptions);
  }

  getAllFrigo(){
    return 	this.http.get(this.baseUrl+'frigo/getFrigos').map(res =>res.json());
  }
   


  setNote(id,note,userid){
    var headers = new HttpHeaders();
    headers.append('Content-Type','application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
          id_recette:id,
          note:note,
          id_user:userid
        };
    return this.http.post(this.baseUrl+'recette/note',JSON.stringify(dayta),requestOptions);
  }
  */
  //---------Login--------------
  getUserById(id) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { id_user: id };
    return this.http.post(this.baseUrl + 'profil/getInfoUser.php', JSON.stringify(dayta), requestOptions);
  }
  login(Username, Password) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      username: Username,
      password: Password
    };
    //let fin = this.http.post(this.baseUrl+'login/login',JSON.stringify(dayta),requestOptions);
    return this.http.post(this.baseUrl + 'user/login.php', JSON.stringify(dayta), requestOptions);

  }

  forgotPassword(email) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = { email: email }
    //let fin = this.http.post(this.baseUrl+'login/login',JSON.stringify(dayta),requestOptions);
    return this.http.post(this.baseUrl + 'user/resetPassword.php', JSON.stringify(dayta), requestOptions);
  }
  enregistrer(Username, Password, Email) {
    var headers = new HttpHeaders();
   
    
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      username: Username,
      password: Password,
      email: Email
    };
    return this.http.post(this.baseUrl + 'user/register.php', JSON.stringify(dayta), requestOptions);
  }

  getcategories() {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    const requestOptions = {
      headers: headers
    };
    return this.http.get(this.baseUrl + 'categorie/getall.php', requestOptions);
  }

  existUser(userid) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    });
    const requestOptions = {
      headers: headers
    };
    var dayta = {
      id_user: userid
    };
    let postResponse = this.http.post(this.baseUrl + 'user/exist.php', JSON.stringify(dayta), requestOptions);
    return postResponse;
  }
  //----------------------------
}