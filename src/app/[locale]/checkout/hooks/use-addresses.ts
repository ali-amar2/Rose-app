import { useState, useCallback, useEffect } from "react";
import { Address, AddressFormData } from "@/lib/types/address";
import {
  getAddressesAction,
  deleteAddressAction,
  addAddressAction,
  updateAddressAction,
} from "@/lib/actions/address.actions";

const defaultCoords = { lat: 30.0444, lng: 31.2357 };

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAddressesAction();
      setAddresses(Array.isArray(data) ? data : []);
    } catch {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { addresses, loading, loadAddresses };
}

export function useAddressForm(fullName: string) {
  const [formData, setFormData] = useState<AddressFormData>({
    username: fullName,
    phone: "",
    city: "",
    street: "",
    lat: defaultCoords.lat.toString(),
    long: defaultCoords.lng.toString(),
  });

  const [mapPosition, setMapPosition] = useState(defaultCoords);

  const handleFormChange = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateLocation = (lat: number, lng: number) => {
    setMapPosition({ lat, lng });
    setFormData((prev) => ({
      ...prev,
      lat: lat.toString(),
      long: lng.toString(),
    }));
  };

  const resetForm = (custom?: Partial<AddressFormData>) => {
    setFormData({
      username: fullName,
      phone: "",
      city: "",
      street: "",
      lat: defaultCoords.lat.toString(),
      long: defaultCoords.lng.toString(),
      ...custom,
    });

    setMapPosition({
      lat: parseFloat(custom?.lat ?? defaultCoords.lat.toString()),
      lng: parseFloat(custom?.long ?? defaultCoords.lng.toString()),
    });
  };

  return {
    formData,
    mapPosition,
    handleFormChange,
    updateLocation,
    resetForm,
    setMapPosition,
  };
}

export function useAddressMutations(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);

  const handleSave = async (
    formData: AddressFormData,
    editing: Address | null
  ) => {
    try {
      setLoading(true);

      editing?._id
        ? await updateAddressAction(editing._id, formData)
        : await addAddressAction(formData);

      await onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    try {
      setLoading(true);
      await deleteAddressAction(addressId);
      await onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSave, handleDelete };
}
