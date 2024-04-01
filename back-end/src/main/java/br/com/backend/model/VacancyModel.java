package br.com.backend.model;

import java.util.ArrayList;

public class VacancyModel {
    private int id;
    private String title;
    private String description;
    private String requirements;
    private String salary;
    private String benefits;
    private String responsibilities;
    private ArrayList<UserModel> candidates;

    public VacancyModel() {
    }

    public VacancyModel(int id, String title, String description, String requirements, String salary, String benefits, String responsibilities) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.salary = salary;
        this.benefits = benefits;
        this.responsibilities = responsibilities;
        this.candidates = new ArrayList<UserModel>();
    }

    public VacancyModel(int id, String title, String description, String requirements, String salary, String benefits, String responsibilities, ArrayList<UserModel> candidates) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.salary = salary;
        this.benefits = benefits;
        this.responsibilities = responsibilities;
        this.candidates = candidates;
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

    public String getResponsibilities() {
        return this.responsibilities;
    }

    public String getBenefits() {
        return this.benefits;
    }

    public String getSalary() {
        return this.salary;
    }

    public String getRequirements() {
        return this.requirements;
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

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }
}
