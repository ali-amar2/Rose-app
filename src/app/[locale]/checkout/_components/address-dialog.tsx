"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Address } from "@/lib/types/address";
import {
  useAddresses,
  useAddressForm,
  useAddressMutations,
} from "../hooks/use-addresses";
import { AddressList } from "./address-list";
import { AddressFormStep1 } from "./form-step-1";
import { AddressFormStep2 } from "./form-step-2";
import { DeleteConfirmation } from "./delete-confirm";
import { StepProgress } from "./step-progress";

// Types
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAddress?: (address: Address) => void;
  currentCity?: string;
}

type ViewMode = "list" | "form-step1" | "form-step2" | "delete";

// Component
export function DeliveryLocationDialog({
  open,
  onOpenChange,
  onSelectAddress,
}: Props) {
  // Translations
  const t = useTranslations("deliveryDialog");
  const tForm = useTranslations("AddressForm");
  const tModal = useTranslations("addressModal");
  const tDelete = useTranslations("DeleteAddress");
  const tMap = useTranslations("MapPicker");

  // Locale
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Session
  const { data: session } = useSession();

  // State
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editing, setEditing] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  // Custom hooks
  const {
    addresses,
    loading: addressesLoading,
    loadAddresses,
  } = useAddresses();

  const fullName = useMemo(() => {
    return `${session?.user?.firstName ?? ""} ${
      session?.user?.lastName ?? ""
    }`.trim();
  }, [session]);

  const { formData, mapPosition, handleFormChange, updateLocation, resetForm } =
    useAddressForm(fullName);

  const {
    loading: mutationLoading,
    handleSave,
    handleDelete,
  } = useAddressMutations(async () => {
    await loadAddresses();
    setViewMode("list");
    setEditing(null);
  });

  // Load addresses when dialog opens
  useEffect(() => {
    if (!open) return;
    loadAddresses();
    setViewMode("list");
  }, [open, loadAddresses]);

  /* ============ Handlers ============ */

  // Handle address selection
  const handleSelect = (address: Address) => {
    onSelectAddress?.(address);
    onOpenChange(false);
  };

  // Add new address
  const handleAddNew = () => {
    setEditing(null);
    resetForm();
    setViewMode("form-step1");
  };

  // Edit address
  const handleEdit = (e: React.MouseEvent, address: Address) => {
    e.stopPropagation();
    setEditing(address);

    resetForm({
      username: address.username,
      phone: address.phone,
      city: address.city,
      street: address.street,
      lat: address.lat,
      long: address.long,
    });

    setViewMode("form-step1");
  };

  // Delete address
  const handleDeleteClick = (e: React.MouseEvent, address: Address) => {
    e.stopPropagation();
    setAddressToDelete(address);
    setViewMode("delete");
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!addressToDelete) return;
    await handleDelete(addressToDelete._id || addressToDelete.id || "");
    setAddressToDelete(null);
  };

  // Save address
  const onSaveAddress = async () => {
    await handleSave(formData, editing);
  };

  // Render
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[53rem] max-h-[41rem] rounded-2xl overflow-y-auto p-3">
        {/* List view */}
        {viewMode === "list" && (
          <>
            <DialogHeader className="py-3 px-6">
              <div className="flex items-center justify-between border-b pb-4">
                <DialogTitle className="text-3xl font-bold text-zinc-800">
                  {t("title")}
                </DialogTitle>
                <Button
                  onClick={handleAddNew}
                  variant="secondary"
                  className="text-maroon-600 text-base font-medium"
                >
                  {t("add-new")}
                </Button>
              </div>
            </DialogHeader>

            <div className="pe-4 py-4 px-6 max-h-[500px] overflow-y-auto">
              <AddressList
                addresses={addresses}
                loading={addressesLoading}
                onAddNew={handleAddNew}
                onSelect={handleSelect}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                translations={{
                  loading: t("loading"),
                  empty: t("empty"),
                  add: t("add"),
                  labels: {
                    home: t("labels.home"),
                    work: t("labels.work"),
                    family: t("labels.family"),
                  },
                }}
              />
            </div>
          </>
        )}

        {/* form step 1 */}
        {viewMode === "form-step1" && (
          <>
            <DialogHeader
              dir={isRTL ? "rtl" : "ltr"}
              className="px-6 pt-6 pb-2"
            >
              <DialogTitle className="text-3xl font-bold text-zinc-800 text-start">
                {editing ? tModal("edit-title") : tModal("add-title")}
              </DialogTitle>
            </DialogHeader>

            {/* Progress Bar */}
            <div className="px-6">
              <StepProgress currentStep={1} isRTL={isRTL} />
            </div>

            {/* Form */}
            <div className="px-6 pb-6 overflow-y-auto">
              <AddressFormStep1
                formData={formData}
                onChange={handleFormChange}
                onNext={() => setViewMode("form-step2")}
                isRTL={isRTL}
                translations={{
                  title: tForm("title"),
                  cityLabel: tForm("cityLabel"),
                  cityPlaceholder: tForm("cityPlaceholder"),
                  streetLabel: tForm("streetLabel"),
                  streetPlaceholder: tForm("streetPlaceholder"),
                  phoneLabel: tForm("phoneLabel"),
                  phonePlaceholder: tForm("phonePlaceholder"),
                  next: tModal("next"),
                }}
              />
            </div>
          </>
        )}

        {/* form step 2 */}
        {viewMode === "form-step2" && (
          <>
            <DialogHeader
              dir={isRTL ? "rtl" : "ltr"}
              className="px-6 pt-6 pb-2"
            >
              <DialogTitle className="text-3xl font-bold text-zinc-800 text-start">
                {editing ? tModal("edit-title") : tModal("add-title")}
              </DialogTitle>
            </DialogHeader>

            {/* Progress Bar */}
            <div className="px-6">
              <StepProgress currentStep={2} isRTL={isRTL} />
            </div>

            {/* Map Step */}
            <div className="px-6 pb-6 overflow-y-auto">
              <AddressFormStep2
                mapPosition={mapPosition}
                loading={mutationLoading}
                isRTL={isRTL}
                editing={!!editing}
                onBack={() => setViewMode("form-step1")}
                onSave={onSaveAddress}
                onLocationUpdate={updateLocation}
                translations={{
                  selectLocation: tModal("select-location"),
                  findLocation: tMap("findLocation"),
                  notSupported: tMap("notSupported"),
                  locationError: tMap("locationError"),
                  saving: tModal("saving"),
                  saveBtn: tModal("save-btn"),
                  addBtn: tModal("add-btn"),
                }}
              />
            </div>
          </>
        )}

        {/* Delete  */}
        {viewMode === "delete" && (
          <DeleteConfirmation
            loading={mutationLoading}
            isRTL={isRTL}
            onCancel={() => setViewMode("list")}
            onConfirm={confirmDelete}
            translations={{
              title: tDelete("title"),
              cancel: tDelete("cancel"),
              confirm: tDelete("confirm"),
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
