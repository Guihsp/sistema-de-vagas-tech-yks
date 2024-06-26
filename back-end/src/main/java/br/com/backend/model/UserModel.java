package br.com.backend.model;

import java.util.ArrayList;

public class UserModel {
    private int id;
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String information;
    private String location;
    private ArrayList<VacancyModel> vacancies;

    public UserModel(int id, String name, String email, String phoneNumber, String information, String location) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.information = information;
        this.location = location;
    }

    public UserModel() {
    }

    public UserModel(int id, String name, String email, String password, String phoneNumber, String information,
            String location) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.information = information;
        this.location = location;
        this.vacancies = new ArrayList<VacancyModel>();
    }

    public UserModel(int id, String name, String email, String password, String phoneNumber, String information,
            String location, ArrayList<VacancyModel> vacancies) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.information = information;
        this.location = location;
        this.vacancies = vacancies;
    }

    public UserModel(String name, String email, String password, String phoneNumber, String information,
            String location) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.information = information;
        this.location = location;
    }

    public ArrayList<VacancyModel> getVacancies() {
        return this.vacancies;
    }

    public void setVacancies(ArrayList<VacancyModel> vacancies) {
        this.vacancies = vacancies;
    }

    public void addVacancy(VacancyModel vacancy) {
        this.vacancies.add(vacancy);
    }

    public void removeVacancy(VacancyModel vacancy) {
        this.vacancies.remove(vacancy);
    }

    public String getInformation() {
        return this.information;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPassword() {
        return this.password;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
}
