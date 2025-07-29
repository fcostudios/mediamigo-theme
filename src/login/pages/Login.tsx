import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = () => {
        setIsLoginButtonDisabled(true);
        return true;
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container" className="text-center">
                    <div id="kc-registration">
                        <span className="text-neutral-900">
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl} className="text-primary hover:text-primary-600 underline">
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
        >
            <div id="kc-form" className="max-w-md mx-auto">
                <div id="kc-form-wrapper" className="bg-white rounded-lg shadow-card p-8">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={onSubmit}
                            action={url.loginAction}
                            method="post"
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                {!usernameHidden && (
                                    <div className="space-y-2">
                                        <label htmlFor="username" className="block text-sm font-medium text-neutral-900">
                                            {!realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                    ? msg("usernameOrEmail")
                                                    : msg("email")}
                                        </label>
                                        <input
                                            tabIndex={2}
                                            id="username"
                                            className={clsx(
                                                "pf-c-form-control",
                                                messagesPerField.existsError("username", "password") && "border-red-500"
                                            )}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <span
                                                id="input-error"
                                                className="text-sm text-red-600"
                                                aria-live="polite"
                                            >
                                                {messagesPerField.getFirstError("username", "password")}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-neutral-900">
                                        {msg("password")}
                                    </label>
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        className={clsx(
                                            "pf-c-form-control",
                                            messagesPerField.existsError("username", "password") && "border-red-500"
                                        )}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                {realm.rememberMe && !usernameHidden && (
                                    <div className="flex items-center">
                                        <input
                                            tabIndex={5}
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        />
                                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-neutral-900">
                                            {msg("rememberMe")}
                                        </label>
                                    </div>
                                )}
                                {realm.resetPasswordAllowed && (
                                    <div className="text-sm">
                                        <a
                                            tabIndex={6}
                                            href={url.loginResetCredentialsUrl}
                                            className="text-primary hover:text-primary-600 underline"
                                        >
                                            {msg("doForgotPassword")}
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    value={auth.selectedCredential}
                                />
                                <button
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                >
                                    {msg("doLogIn")}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {realm.password && social?.providers && social.providers.length > 0 && (
                    <div id="kc-social-providers" className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-neutral-100 text-neutral-900">{msg("identity-provider-login-label")}</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">
                            {social.providers.map(p => (
                                <a
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    href={p.loginUrl}
                                >
                                    {p.iconClasses && (
                                        <i className={clsx(p.iconClasses, "mr-2")} aria-hidden="true" />
                                    )}
                                    <span>{p.displayName}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Template>
    );
}