"use client";

import React from "react";

import LicenseRequired from "@calcom/features/ee/common/components/LicenseRequired";
import { getLayout } from "@calcom/features/settings/layouts/SettingsLayout";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import {
  Meta,
  Switch,
  Dropdown,
  Button,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownItem,
  DropdownMenuItem,
} from "@calcom/ui";

function OrganizationAttributesPage() {
  const { t } = useLocale();
  const { data, isLoading } = trpc.viewer.attributes.get.useQuery();

  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Meta title="Attributes" description="Manage attributes for your team members" />

      <LicenseRequired>
        <div className="border-subtle bg-default flex flex-col gap-4 rounded-lg border p-6">
          <h2 className="text-emphasis leadning-none text-base font-semibold">{t("custom")}</h2>

          {data?.attributes && data?.attributes?.length > 0 ? (
            <>
              <li className="border-subtle bg-default divide-subtle flex flex-col divide-y rounded-lg border">
                {data?.attributes.map((attribute) => (
                  <ul className="focus-within:border-emphasis flex justify-between p-4" key={attribute.id}>
                    <div>
                      <h3 className="leadning-none text-sm font-semibold">{t("Skills")}</h3>
                      <p className="text-default leadning-none text-sm font-normal">{t("multiselect")}</p>
                    </div>
                    <div className="flex gap-4">
                      <Switch />
                      <Dropdown modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="icon"
                            color="secondary"
                            StartIcon="ellipsis"
                            className="ltr:radix-state-open:rounded-r-md rtl:radix-state-open:rounded-l-md"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <DropdownItem type="button" StartIcon="pencil">
                              {t("edit")}
                            </DropdownItem>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DropdownItem type="button" StartIcon="trash-2" color="destructive">
                              {t("delete")}
                            </DropdownItem>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </Dropdown>
                    </div>
                  </ul>
                ))}
              </li>
            </>
          ) : (
            <p>No attributes</p>
          )}
        </div>
      </LicenseRequired>
    </>
  );
}

OrganizationAttributesPage.getLayout = getLayout;

export default OrganizationAttributesPage;
