package br.com.backend.model;

import java.util.ArrayList;

public class VacancyModel {
    private int id;
    private String title;
    private String description;
    private String requeriments;
    private String salary;
    private ArrayList<UserModel> candidates;
    private int companyId;
    private String companyName;
    private String companyEmail;
    private String companyDescription;
    private String companyInformation;
    private String location;

    public VacancyModel() {
    }

    public VacancyModel(int id, String title, String description, String requeriments, String salary, int companyId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requeriments = requeriments;
        this.salary = salary;
        this.candidates = new ArrayList<UserModel>();
        this.companyId = companyId;
    }

    public VacancyModel(int id, String title, String description, String requeriments, String salary, ArrayList<UserModel> candidates, int companyId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requeriments = requeriments;
        this.salary = salary;
        this.candidates = candidates;
        this.companyId = companyId;
    }

    public ArrayList<UserModel> getCandidates() {
        return this.candidates;
    }

    public void setCandidates(ArrayList<UserModel> candidates) {
        this.candidates = candidates;
    }

    public void addCandidate(UserModel candidate) {
        this.candidates.add(candidate);
    }

    public void removeCandidate(UserModel candidate) {
        this.candidates.remove(candidate);
    }

    public String getSalary() {
        return this.salary;
    }

    public String getRequeriments() {
        return this.requeriments;
    }

    public String getDescription() {
        return this.description;
    }

    public String getTitle() {
        return this.title;
    }

    public int getId() {
        return this.id;
    }

    public int getCompanyId() {
        return this.companyId;
    }

    public String getCompanyName() {
        return this.companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyEmail() {
        return this.companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public String getCompanyDescription() {
        return this.companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public String getCompanyInformation() {
        return this.companyInformation;
    }

    public void setCompanyInformation(String companyInformation) {
        this.companyInformation = companyInformation;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String companyLocation) {
        this.location = companyLocation;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRequeriments(String requeriments) {
        this.requeriments = requeriments;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }
}
