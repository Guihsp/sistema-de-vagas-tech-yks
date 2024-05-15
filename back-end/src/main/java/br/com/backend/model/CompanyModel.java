package br.com.backend.model;

import java.util.ArrayList;

public class CompanyModel {
    private int id;
    private String name;
    private String email;
    private String password;
    private String description;
    private String information;
    private String location;
    private ArrayList<VacancyModel> vacancies;

    public CompanyModel(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public CompanyModel() {
    }

    public CompanyModel(int id, String name, String email, String password, String description, String information,
            String location) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.description = description;
        this.information = information;
        this.location = location;
        this.vacancies = new ArrayList<VacancyModel>();
    }

    public CompanyModel(int id, String name, String email, String password, String description, String information,
            String location, ArrayList<VacancyModel> vacancies) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.description = description;
        this.information = information;
        this.location = location;
        this.vacancies = vacancies;
    }

    public CompanyModel(int id, String name, String email, String description, String information,
            String location) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.description = description;
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

    public void setInformation(String information) {
        this.information = information;
    }

    public int getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }

    public String getName() {
        return this.name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {

        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
