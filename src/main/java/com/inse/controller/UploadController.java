package com.inse.controller;

import com.inse.model.Bundle;
import com.inse.scheduler.GeneticAlgorithm;
import com.inse.service.NurseVisitProcessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class UploadController {

    //private static String UPLOADED_FOLDER = "E://INSE//";
    private static String UPLOADED_FOLDER = "/Users/klajdi/Desktop/temp/";
    private NurseVisitProcessor nurseVisitProcessor = new NurseVisitProcessor();

    @GetMapping("/")
    public String index() {
        return "upload";
    }

    //@RequestMapping(value = "/upload", method = RequestMethod.POST)
    @PostMapping("/upload") //new annotation since 4.3
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "redirect:uploadStatus";
        }

        try {

            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            // Parse the excel sheet from the location provided
            nurseVisitProcessor.processNurseVisits(UPLOADED_FOLDER + file.getOriginalFilename());
            redirectAttributes.addFlashAttribute("message", "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return "redirect:/list";
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ModelAndView getList(){
        // Present list of nurses
        List<String> list  = nurseVisitProcessor.getBundlesPerNurseAsList();

        //Calculate the best Schedule
        List<String> solution = new GeneticAlgorithm(nurseVisitProcessor.getBundlesForNurse(), nurseVisitProcessor.getVisitsPriceList()).calculateOptimalSchedule().printFormattedScheduleForTheWeb();

        ModelAndView model = new ModelAndView("listBundles");
        model.addObject("lists", list );
        model.addObject("schedule", solution);

        return model;
    }

    @GetMapping("/uploadStatus")
    public ModelAndView uploadStatus(@ModelAttribute Bundle bundle) {
        List<Bundle> bundles = new ArrayList<Bundle>();
        Bundle b1 = new Bundle("1,2", 100.0);
        bundle.setCostOfVisitBundle(100.00);
        bundle.setVisitSequence("1,2,3");
        //bundle = b1;
        bundles.add(bundle);
        ModelAndView bundleModel = new ModelAndView("listBundles");
        bundleModel.addObject("Bundle",bundles);
        return bundleModel;
    }

    @GetMapping("/uploadMultiPage")
    public String uploadMultiPage() {
        return "uploadMulti";
    }

}