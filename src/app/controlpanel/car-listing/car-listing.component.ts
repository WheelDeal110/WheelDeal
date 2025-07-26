import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from 'src/app/appServices/dropdown.service';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.css']
})
export class CarListingComponent {
  listingForm!: FormGroup;
  conditions:any[] = [];
  bodyTypes:any[] = [];
  makes:any = [];
  models:any = [];
  years:any[] = [];;
  driveTypes:any = [];
  transmissions:any[] = [];
  fuelTypes:any[] = [];
  cylinders:any[] = [];
  colors:any[] = [];
  doors = [2, 4, 6];
  features:any[] = [];

   constructor(private fb: FormBuilder, private ddServ:DropdownService) {
    this.fetchBodyTypes();
    this.fetchBrands();
    this.fetchDriveType();
    this.fetchFuelTypes();
    this.fetchcarModels();
    this.fetchConditions();
    this.fetchyears();
    this.fetchColors();
    this.fetchCarCylinder();
    this.fetchFeatures();
    this.fetchTransmission();
   }

    ngOnInit(): void {
    const featuresControls = this.features.reduce((acc: { [key: string]: FormControl }, feature) => {
    acc[feature] = this.fb.control(false);
    return acc;
  }, {});
    
    this.listingForm = this.fb.group({
      title: ['', Validators.required],
      condition: ['', Validators.required],
      bodyType: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      year: ['', Validators.required],
      driveType: ['', Validators.required],
      transmission: ['', Validators.required],
      fuelType: ['', Validators.required],
      mileage: [null, Validators.required],
      engineSize: [null, Validators.required],
      cylinders: ['', Validators.required],
      color: ['', Validators.required],
      doors: ['', Validators.required],
      vin: ['', Validators.required],
      tags: [''],
      images: [[]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      description: [''],
      features:  this.fb.group(featuresControls),
      contactName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
      agree: [false, Validators.requiredTrue],
    });
  }

   onFeatureChange(feature: string, event: any) {
    const selected: string[] = this.listingForm.get('features')?.value || [];
    if (event.target.checked) {
      if (!selected.includes(feature)) {
        selected.push(feature);
      }
    } else {
      const index = selected.indexOf(feature);
      if (index > -1) {
        selected.splice(index, 1);
      }
    }
    this.listingForm.get('features')?.setValue(selected);
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.listingForm.patchValue({ images: files });
  }

  onSubmit() {
    console.log(this.listingForm.value);
    if (this.listingForm.valid) {
      alert('Listing submitted!');
    } else {
      alert('Please fix errors before submitting.');
    }
  }

 fetchBodyTypes() {
      this.ddServ.getBodyType().pipe().subscribe((res: any) => {
      this.bodyTypes = res;
    });
  }
  
  fetchBrands() {
      this.ddServ.getBrand().pipe().subscribe((res: any) => {
      this.makes = res;
    });
  }

  fetchDriveType() {
      this.ddServ.getDriveType().pipe().subscribe((res: any) => {
      this.driveTypes = res;
    });
  }

  fetchFuelTypes() {
      this.ddServ.getFuelType().pipe().subscribe((res: any) => {
      this.fuelTypes = res;
    });
  }

  fetchcarModels() {
      this.ddServ.getCarModels().pipe().subscribe((res: any) => {
      this.models = res;
    });
  }

  fetchConditions() {
      this.ddServ.getConditions().pipe().subscribe((res: any) => {
      this.conditions = res;
    });
  }

  fetchyears() {
      this.ddServ.getyears().pipe().subscribe((res: any) => {
      this.years = res;
    });
  }

  fetchColors() {
      this.ddServ.getcarColors().pipe().subscribe((res: any) => {
      this.colors = res;
    });
  }

  fetchCarCylinder() {
      this.ddServ.getCarCylinder().pipe().subscribe((res: any) => {
      this.cylinders = res;
    });
  }

  fetchFeatures() {
      this.ddServ.getFeatures().pipe().subscribe((res: any) => {
      this.features = res;
    });
  }

  fetchTransmission() {
      this.ddServ.gettransmission().pipe().subscribe((res: any) => {
      this.transmissions = res;
    });
  }
}
