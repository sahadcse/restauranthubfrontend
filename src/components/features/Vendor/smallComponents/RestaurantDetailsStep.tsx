import React from "react";
import Input from "../../../ui/Input";
import {
  FormStepProps,
  CUISINE_OPTIONS,
} from "../../../../lib/interfaces/vendorForm";
import { FiMapPin } from "react-icons/fi";

export const RestaurantDetailsStep: React.FC<FormStepProps> = ({
  formData,
  handleInputChange,
  errors = {},
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          value={formData.restaurantName}
          onChange={handleInputChange}
          required
          variant="outline"
          aria-describedby={
            errors.restaurantName ? "restaurantName-error" : undefined
          }
        />
        {errors.restaurantName && (
          <p id="restaurantName-error" className="mt-1 text-sm text-red-600">
            {errors.restaurantName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            aria-describedby={errors.cuisine ? "cuisine-error" : undefined}
          >
            <option value="">Select Cuisine Type</option>
            {CUISINE_OPTIONS.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
          {errors.cuisine && (
            <p id="cuisine-error" className="mt-1 text-sm text-red-600">
              {errors.cuisine}
            </p>
          )}
        </div>

        <div>
          <Input
            type="number"
            name="yearsInBusiness"
            placeholder="Years in Business"
            value={formData.yearsInBusiness}
            onChange={handleInputChange}
            required
            variant="outline"
            min="1"
            aria-describedby={
              errors.yearsInBusiness ? "yearsInBusiness-error" : undefined
            }
          />
          {errors.yearsInBusiness && (
            <p id="yearsInBusiness-error" className="mt-1 text-sm text-red-600">
              {errors.yearsInBusiness}
            </p>
          )}
        </div>
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Restaurant Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <Input
          type="text"
          name="address"
          placeholder="Restaurant Address"
          value={formData.address}
          onChange={handleInputChange}
          leftIcon={<FiMapPin className="h-4 w-4" />}
          required
          variant="outline"
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className="mt-1 text-sm text-red-600">
            {errors.address}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
            variant="outline"
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && (
            <p id="city-error" className="mt-1 text-sm text-red-600">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
            variant="outline"
            aria-describedby={errors.state ? "state-error" : undefined}
          />
          {errors.state && (
            <p id="state-error" className="mt-1 text-sm text-red-600">
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <Input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            variant="outline"
            aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
          />
          {errors.zipCode && (
            <p id="zipCode-error" className="mt-1 text-sm text-red-600">
              {errors.zipCode}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            type="text"
            name="businessLicense"
            placeholder="Business License Number"
            value={formData.businessLicense}
            onChange={handleInputChange}
            required
            variant="outline"
            aria-describedby={
              errors.businessLicense ? "businessLicense-error" : undefined
            }
          />
          {errors.businessLicense && (
            <p id="businessLicense-error" className="mt-1 text-sm text-red-600">
              {errors.businessLicense}
            </p>
          )}
        </div>

        <div>
          <Input
            type="text"
            name="taxId"
            placeholder="Tax ID Number"
            value={formData.taxId}
            onChange={handleInputChange}
            required
            variant="outline"
            aria-describedby={errors.taxId ? "taxId-error" : undefined}
          />
          {errors.taxId && (
            <p id="taxId-error" className="mt-1 text-sm text-red-600">
              {errors.taxId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
