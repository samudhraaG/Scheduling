package com.inse.test;

import com.inse.scheduler.GeneticAlgorithm;
import com.inse.utility.ExcelParser;

import java.text.ParseException;

public class TestDriverGenetic {

    public static void main(String[] args){

        ExcelParser parser =  new ExcelParser("//Users//klajdi//Desktop//data_sample//Data Sample 2-2.xlsx");

        try {
            parser.parseExcelFile();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        parser.getBundlesForNurse();

       // System.out.println(parser.getVisitPrice());
        // System.out.println(parser.getBundlesForNurse());

       new GeneticAlgorithm(parser.getBundlesForNurse(), parser.getVisitPrice()).calculateOptimalSchedule().printFormattedScheduleForTheWeb();

    }
}
