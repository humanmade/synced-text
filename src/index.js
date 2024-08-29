import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import {
	ClipboardButton,
	PanelBody,
	PanelRow,
	Button,
	TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

function SyncedTextSidebar() {
	const [ keyValues, setKeyValues ] = useState( {} );
	const [ newKeyValue, setNewKeyValue ] = useState( '' );
	const [ hasCopied, setHasCopied ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );

	const syncedText = useSelect( ( select ) => {
		const storedSyncedText = select( 'core' ).getSite()?.syncedText || {};
		setKeyValues( storedSyncedText );
		return storedSyncedText;
	}, [] );

	const { saveSite } = useDispatch( 'core' );

	const canSaveOptions = useSelect( ( select ) =>
		select( 'core' ).canUser( 'update', 'settings' )
	);

	const saveKeyValues = () => {
		setIsSaving( true );
		saveSite( { syncedText: keyValues } );
		setTimeout( () => setIsSaving( false ), 800 );
	};

	const addKeyValue = () => {
		const newKey = newKeyValue
			.toLowerCase()
			.replace( /\s+/g, '_' )
			.replace( /[^a-z0-9_-]+/g, '' );
		setKeyValues( { ...keyValues, [ newKey ]: '' } );
		setNewKeyValue( '' );
	};

	const removeKeyValue = ( key ) => {
		const updatedKeyValues = { ...keyValues };
		delete updatedKeyValues[ key ];
		setKeyValues( updatedKeyValues );
	};

	return (
		<>
			<PluginSidebarMoreMenuItem target="synced-text-sidebar">
				{ __( 'Synced Text', 'synced-text' ) }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name="synced-text-sidebar"
				title={ __( 'Synced Text', 'synced-text' ) }
			>
				{ canSaveOptions && (
					<PanelBody>
						<Button
							onClick={ saveKeyValues }
							variant="primary"
							disabled={
								JSON.stringify( keyValues ) ===
									JSON.stringify( syncedText ) || isSaving
							}
							icon={ isSaving ? 'hourglass' : 'saved' }
						>
							{ isSaving
								? __( 'Saving…', 'synced-text' )
								: __( 'Save Changes', 'synced-text' ) }
						</Button>
					</PanelBody>
				) }
				{ Object.keys( keyValues ).map( ( key ) => (
					<PanelBody key={ key }>
						<TextControl
							label={ `{${ key }}` }
							value={ keyValues[ key ] || '' }
							readOnly={ ! canSaveOptions }
							onChange={ ( newValue ) => {
								const updatedKeyValues = {
									...keyValues,
									[ key ]: newValue,
								};
								setKeyValues( updatedKeyValues );
							} }
						/>
						<PanelRow>
							<ClipboardButton
								variant="tertiary"
								size="small"
								text={ `{${ key }}` }
								onCopy={ () => setHasCopied( true ) }
								onFinishCopy={ () => setHasCopied( false ) }
							>
								{ hasCopied ? 'Copied!' : 'Copy placeholder' }
							</ClipboardButton>
							{ canSaveOptions && (
								<Button
									isDestructive
									onClick={ () => removeKeyValue( key ) }
									variant="tertiary"
									icon="trash"
									size="small"
									iconSize={ 14 }
								>
									{ __( 'Remove', 'synced-text' ) }
								</Button>
							) }
						</PanelRow>
					</PanelBody>
				) ) }
				{ canSaveOptions && (
					<PanelBody>
						<TextControl
							label={ __( 'New key name', 'synced-text' ) }
							value={ newKeyValue }
							onChange={ setNewKeyValue }
						/>
						<Button
							onClick={ addKeyValue }
							variant="secondary"
							icon=""
						>
							{ __( 'Add', 'synced-text' ) }
						</Button>
					</PanelBody>
				) }
			</PluginSidebar>
		</>
	);
}

registerPlugin( 'synced-text-sidebar', {
	render: SyncedTextSidebar,
	icon: 'embed-generic',
} );
