import { formatNumber } from "@angular/common";
import { DevelopersByCategoryChartData, PeopleByGradesChartData, SalariesByGrade, SalariesByMoneyBarChart, SalariesChartResponse } from "@services/user-salaries.service";
import { SalariesPerProfession } from "../salaries-per-profession";
import { UserSalary, UserSalaryAdminDto } from "@models/salaries/salary.model";
import { LabelEntityDto } from "@services/label-entity.model";

export class SalariesChart {

    readonly averageSalary: string;
    readonly medianSalary: string;

    readonly averageRemoteSalary: string | null;
    readonly medianRemoteSalary: string | null;

    readonly localSalariesByGrade: Array<SalariesByGrade>;
    readonly remoteSalariesByGrade: Array<SalariesByGrade>;

    readonly countOfRecords: number;
    readonly salaries: Array<UserSalary>;

    readonly salariesByMoneyBarChart: SalariesByMoneyBarChart | null;
    readonly salariesByMoneyBarChartForRemote: SalariesByMoneyBarChart | null;

    readonly salariesPerProfessionForLocal: Array<SalariesPerProfession> | null;
    readonly salariesPerProfessionForRemote: Array<SalariesPerProfession> | null;

    readonly currentUserSalary: UserSalaryAdminDto | null = null;
    readonly currentUserSalaryValue: string | null = null;

    readonly peopleByGradesChartDataForLocal: PeopleByGradesChartData | null;
    readonly peopleByGradesChartDataForRemote: PeopleByGradesChartData | null;

    readonly developersByAgeChartData: DevelopersByCategoryChartData | null;
    readonly developersByExperienceYearsChartData: DevelopersByCategoryChartData | null;

    readonly hasRemoteSalaries: boolean;
    readonly hasAuthentication: boolean;

    constructor(readonly data: SalariesChartResponse, readonly allProfessions: Array<LabelEntityDto>) {
        this.averageSalary = SalariesChart.formatNumber(data.averageSalary) ?? '';
        this.medianSalary = SalariesChart.formatNumber(data.medianSalary) ?? '';

        this.localSalariesByGrade = data.localSalariesByGrade ?? [];
        this.remoteSalariesByGrade = data.remoteSalariesByGrade ?? [];

        this.averageRemoteSalary = SalariesChart.formatNumber(data.averageRemoteSalary);
        this.medianRemoteSalary = SalariesChart.formatNumber(data.medianRemoteSalary)

        this.countOfRecords = data.totalCountInStats;
        this.salaries = data.salaries;

        this.salariesByMoneyBarChart = data.salariesByMoneyBarChart;
        this.salariesByMoneyBarChartForRemote = data.salariesByMoneyBarChartForRemote;

        const salariesPerProfession = SalariesPerProfession.from(data.salaries, allProfessions);

        this.salariesPerProfessionForLocal = salariesPerProfession.local;
        this.salariesPerProfessionForRemote = salariesPerProfession.remote;
        this.hasRemoteSalaries = this.salariesPerProfessionForRemote.length > 0;
        this.hasAuthentication = data.hasAuthentication;

        this.currentUserSalary = data.currentUserSalary;
        this.currentUserSalaryValue = data.currentUserSalary
            ? SalariesChart.formatNumber(data.currentUserSalary.value)
            : null;

        this.peopleByGradesChartDataForLocal = data.peopleByGradesChartDataForLocal;
        this.peopleByGradesChartDataForRemote = data.peopleByGradesChartDataForRemote;

        this.developersByAgeChartData = data.developersByAgeChartData;
        this.developersByExperienceYearsChartData = data.developersByExperienceYearsChartData;
    }

    public static formatNumber(value: number | null): string | null {
        return value != null
            ? formatNumber(value, 'en-US', '1.0-2')
            : null;
    }
}
