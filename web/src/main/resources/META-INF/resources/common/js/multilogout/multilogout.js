/*
 * Script multilogout
 * Responsável por deslogar todas as janela ou abas abertas do mesmo navegador
 * caso seja executado logout ou logon com usuário diferente em uma das telas.
 * 
 * Método login(contextPath, loggedUser)
 * deve ser chamado na página seguinte ao login efetuado com sucesso. Este irá registrar o usuário atual
 * e monitorar a alteração do usuário logado (novo login) ou usuario logado vazio (logout)
 * 
 * Método logout()
 * deve ser acionado na tela de login quando existir o parâmetro invalidatedSessionBy
 * O seu valor indicará o motivo do redirecionamento, que na login.xhtml gerará a mensagem
 * do motivo do redirecionamento
 * 
 */
var multilogout = {
	fiscalUserKey: "NG-FISCAL-USER",
	fiscalIsSSOUserKey: "NG-FISCAL-SSO-USER",
	fiscalUser: "",
	contextPath: "",
	isSSOUser: "",
	login: function(contextPath, loggedUser, ssoUser) {
		multilogout.contextPath = contextPath;
		multilogout.fiscalUser = loggedUser;
		multilogout.isSSOUser = ssoUser;
		localStorage.setItem(multilogout.fiscalUserKey, loggedUser);
		localStorage.setItem(multilogout.fiscalIsSSOUserKey, ssoUser);
		setInterval(multilogout.logoutOnUserChange, 500);
	},
	logout: function() {
		localStorage.setItem(multilogout.fiscalUserKey, "");
		localStorage.setItem(multilogout.fiscalIsSSOUserKey, "");
	},
	logoutOnUserChange: function () {
		var loginPage = multilogout.contextPath + "/views/page/login/login.jsf";
		var ssoInfoPage = multilogout.contextPath + "/views/page/sso/sso.jsf";
		var localUser = localStorage.getItem(multilogout.fiscalUserKey);
		var differentLogins = multilogout.fiscalUser != localUser;
		var isSSOUser =  localStorage.getItem(multilogout.fiscalIsSSOUserKey);
		
		if (localUser == "" && differentLogins) {
			console.log("[multilogout] redicionando para o login devido ao logout em outra janela ou aba");
			window.location = loginPage + "?invalidatedSessionBy=logout";
		} else if (differentLogins) {
			console.log("[multilogout] redicionando para o login devido ao login com outro usuário em outra janela ou aba");
			if (isSSOUser == 'true') {
				window.location = ssoInfoPage + "?invalidSession";
			} else {
				window.location = loginPage + "?invalidatedSessionBy=login";
			}
		} 
	}
};

